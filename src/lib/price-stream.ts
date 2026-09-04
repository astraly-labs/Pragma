import type { Dispatch, SetStateAction } from "react";
import type { StreamData } from "@/app/(dashboard)/assets/_types";

type Quote = StreamData & { loading: false };
export type PriceStreamData = Record<
  string,
  Quote | { loading: true } | { loading: false; error: string }
>;

export function parsePriceUpdates(data: unknown): Record<string, Quote> {
  if (!Array.isArray(data)) throw new Error("Invalid price stream response");

  const updates: Record<string, Quote> = {};
  const entries: unknown[] = data.flat();
  for (const entry of entries) {
    if (
      !entry ||
      typeof entry !== "object" ||
      !("pair_id" in entry) ||
      typeof entry.pair_id !== "string" ||
      !("price" in entry) ||
      typeof entry.price !== "string" ||
      !/^(0x[0-9a-f]+|[0-9]+(?:\.[0-9]+)?)$/i.test(entry.price) ||
      !("timestamp" in entry) ||
      typeof entry.timestamp !== "number" ||
      !Number.isFinite(entry.timestamp) ||
      entry.timestamp <= 0 ||
      !("decimals" in entry) ||
      typeof entry.decimals !== "number" ||
      !Number.isInteger(entry.decimals) ||
      entry.decimals < 0 ||
      entry.decimals > 255 ||
      !("num_sources_aggregated" in entry) ||
      typeof entry.num_sources_aggregated !== "number" ||
      !Number.isInteger(entry.num_sources_aggregated) ||
      entry.num_sources_aggregated < 0
    )
      continue;

    const timestamp = entry.timestamp / 1000;
    if (updates[entry.pair_id]?.last_updated_timestamp >= timestamp) continue;
    updates[entry.pair_id] = {
      price: entry.price,
      decimals: entry.decimals,
      last_updated_timestamp: timestamp,
      nb_sources_aggregated: entry.num_sources_aggregated,
      variations: { "1h": 0, "1d": 0, "1w": 0 },
      loading: false,
    };
  }
  return updates;
}

export function startPriceStream(
  pairs: string[],
  setData: Dispatch<SetStateAction<PriceStreamData>>
): () => void {
  const controller = new AbortController();
  const { signal } = controller;
  let retryTimer: ReturnType<typeof setTimeout> | undefined;
  let activeReader: ReadableStreamDefaultReader<string> | undefined;
  const query = new URLSearchParams();
  pairs.forEach((pair) => query.append("pairs", pair));
  const url = `/api/stream?${query}`;

  const connect = async () => {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/event-stream" },
        signal,
      });
      if (!response.ok || !response.body) {
        throw new Error(`Price stream returned HTTP ${response.status}`);
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      activeReader = reader;
      let buffer = "";
      try {
        while (!signal.aborted) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += value;
          const events = buffer.split(/\r?\n\r?\n/);
          buffer = events.pop() ?? "";
          for (const event of events) {
            const payload = event
              .split(/\r?\n/)
              .filter((line) => line.startsWith("data:"))
              .map((line) => line.slice(5).trimStart())
              .join("\n");
            if (!payload) continue;
            const data: unknown = JSON.parse(payload);
            if (data && typeof data === "object" && "connected" in data)
              continue;
            if (data && typeof data === "object" && "error" in data) {
              throw new Error(String(data.error));
            }
            const updates = parsePriceUpdates(data);
            if (signal.aborted) return;
            setData((previous) => {
              const next = { ...previous };
              for (const pair of pairs) {
                const update = updates[pair];
                const old = previous[pair];
                if (
                  update &&
                  (!old ||
                    !("price" in old) ||
                    update.last_updated_timestamp >= old.last_updated_timestamp)
                ) {
                  next[pair] = update;
                } else if (!old || !("price" in old)) {
                  next[pair] = { loading: false, error: "No recent price" };
                }
              }
              return next;
            });
          }
        }
      } finally {
        await reader.cancel().catch(() => {});
        reader.releaseLock();
        activeReader = undefined;
      }
    } catch (error) {
      if (signal.aborted) return;
      console.error("[📡 Price stream] Connection failed; reconnecting", error);
    }
    if (!signal.aborted) {
      setData((previous) => {
        const next = { ...previous };
        for (const pair of pairs) {
          if (!next[pair] || next[pair].loading) {
            next[pair] = { loading: false, error: "Price stream unavailable" };
          }
        }
        return next;
      });
    }
    if (!signal.aborted) retryTimer = setTimeout(connect, 3000);
  };

  void connect();
  return () => {
    controller.abort();
    void activeReader?.cancel().catch(() => {});
    clearTimeout(retryTimer);
  };
}
