import moment from "moment";
import { getPublisherType } from "@/utils";
import { ProcessedPublisher, Publisher } from "@/app/(dashboard)/assets/_types";

interface PairsReported {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  dailyUpdates: number;
}

export const getPublisher = async (
  name: string,
  source?: string
): Promise<ProcessedPublisher | undefined> => {
  if (!source || source === "api") {
    return undefined;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/publisher/${name}?network=starknet-${source}&data_type=spot_entry`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch publishers data");
  }

  const publisher: Publisher = await response.json();

  if (!publisher) {
    return undefined;
  }

  return {
    image: `/assets/publishers/${publisher.publisher.toLowerCase()}.svg`,
    type: getPublisherType(Number(publisher.type)),
    link: publisher.website_url,
    name: publisher.publisher,
    lastUpdated: moment(
      Number(publisher.last_updated_timestamp) * 1000
    ).fromNow(),
    reputationScore: "soon",
    nbFeeds: publisher.nb_feeds,
    dailyUpdates: publisher.daily_updates,
    totalUpdates: publisher.total_updates,
    pairs: publisher.components.map((component) => {
      const lastUpdated = moment(
        component.last_updated_timestamp * 1000
      ).fromNow();

      return {
        image: `/assets/currencies/${
          component.pair_id.toLowerCase().split("/")[0]
        }.svg`,
        type: "Crypto",
        ticker: component.pair_id.replace("/", ""),
        source: component.source,
        lastUpdated: lastUpdated,
        price: parseInt(component.price, 16) / 10 ** component.decimals,
        dailyUpdates: component.daily_updates,
      };
    }),
  };
};
