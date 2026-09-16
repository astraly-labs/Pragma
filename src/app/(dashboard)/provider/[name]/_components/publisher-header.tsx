"use client";

import type { Publisher } from "@/app/(dashboard)/assets/_types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPublisherName, getPublisherType } from "@/utils";
import { ageLabel } from "@/lib/explorer-metrics";

export function PublisherHeader({
  publisher,
  now,
}: {
  publisher: Publisher;
  now: number;
}) {
  const name = getPublisherName(publisher.publisher).replaceAll("_", " ");
  const image =
    publisher.publisher === "PRAGMA"
      ? "/brand/pragma-mark.svg"
      : `/assets/publishers/${publisher.publisher.toLowerCase()}.svg`;
  const sourceCount = new Set(
    publisher.components.map((component) => component.source)
  ).size;
  return (
    <header className="explorer-panel explorer-asset-header">
      <span className="eyebrow">Starknet mainnet / Publisher</span>
      <div className="publisher-identity">
        <Avatar className="h-14 w-14 rounded-none">
          <AvatarImage src={image} alt="" />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h1>{name}</h1>
          <a
            className="explorer-caption"
            href={publisher.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {publisher.website_url} ↗
          </a>
        </div>
        <span className="publisher-kind">
          {getPublisherType(Number(publisher.type))}
        </span>
      </div>
      <dl className="publisher-metrics">
        <div>
          <dt>Published markets</dt>
          <dd>{publisher.nb_feeds}</dd>
        </div>
        <div>
          <dt>Underlying sources</dt>
          <dd>{sourceCount}</dd>
        </div>
        <div>
          <dt>Observations / 24h</dt>
          <dd>{publisher.daily_updates.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Latest observation</dt>
          <dd
            title={new Date(
              publisher.last_updated_timestamp * 1000
            ).toISOString()}
          >
            {ageLabel(publisher.last_updated_timestamp, now)}
          </dd>
        </div>
      </dl>
    </header>
  );
}
