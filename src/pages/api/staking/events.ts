import type { NextApiRequest, NextApiResponse } from "next";
import { PRAGMA_VALIDATOR_ADDRESS } from "@/lib/staking";
import {
  parseActivity,
  parseAttestation,
  parseDelegator,
} from "@/lib/staking-events";
import type { VoyagerActivity, VoyagerDelegator } from "@/lib/staking-events";
import type { AttestationRecord, StakingEventsData } from "@/lib/staking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { type = "delegators", page = "1" } = req.query;
  if (
    typeof type !== "string" ||
    !["delegators", "activity", "attestations"].includes(type) ||
    typeof page !== "string" ||
    !/^[1-9]\d{0,3}$/.test(page)
  ) {
    return res.status(400).json({ error: "Invalid staking history request" });
  }
  const key = process.env.VOYAGER_API_KEY;
  if (!key)
    return res
      .status(503)
      .json({ error: "Staking history is temporarily unavailable." });
  const params = new URLSearchParams({ p: page, ps: "25" });
  params.set(
    type === "activity" ? "address" : "validator",
    PRAGMA_VALIDATOR_ADDRESS
  );
  if (type === "activity") params.set("sort", "DESC");
  const path = type === "activity" ? "validator-details/activity" : type;
  try {
    const response = await fetch(
      `https://public-api.voyager.online/beta/staking/${path}?${params}`,
      {
        headers: {
          "x-api-key": key,
          accept: "application/json",
          "user-agent": "Pragma-Website/1.0",
        },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!response.ok) throw new Error("Staking index unavailable");
    const json = await response.json();
    if (
      !Array.isArray(json.items) ||
      !Number.isInteger(json.pagination?.totalPages)
    )
      throw new Error("Invalid staking history");
    const data: StakingEventsData = {
      delegators:
        type === "delegators"
          ? json.items.map((row: VoyagerDelegator) => parseDelegator(row))
          : [],
      activity:
        type === "activity"
          ? json.items.map((row: VoyagerActivity) => parseActivity(row))
          : [],
      attestations:
        type === "attestations"
          ? json.items.map((row: AttestationRecord) => parseAttestation(row))
          : [],
      page: Number(page),
      totalPages: Math.max(1, json.pagination.totalPages),
      fetchedAt: new Date().toISOString(),
    };
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({
      error: "Staking history is temporarily unavailable. Please retry.",
    });
  }
}
