import moment from "moment";
import { getPublisherType } from "@/utils";
import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";

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
): Promise<
  { publisher: DataProviderInfo; pairs: PairsReported | [] } | undefined
> => {
  if (!source || source === "api") {
    return undefined;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/publishers?network=${source}&data_type=spot_entry`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch publishers data");
  }

  const publishers: DataProviderInfo[] = await response.json();

  const foundPublisher = publishers?.find(
    (publisher) => publisher.name.toLowerCase() === name.toLowerCase()
  );

  if (!foundPublisher) {
    return undefined;
  }

  return {
    publisher: {
      image: `/assets/publishers/${foundPublisher.name.toLowerCase()}.svg`,
      type: getPublisherType(Number(foundPublisher.type)),
      link: foundPublisher.link,
      name: foundPublisher.name,
      lastUpdated: moment(Number(foundPublisher.lastUpdated) * 1000).fromNow(),
      reputationScore: "soon",
      nbFeeds: foundPublisher.nbFeeds,
      dailyUpdates: foundPublisher.dailyUpdates,
      totalUpdates: foundPublisher.totalUpdates,
    },
    pairs: [],

    // foundPublisher.components.map((component) => {
    //   const lastUpdated = moment(
    //     component.last_updated_timestamp * 1000
    //   ).fromNow();

    //   return {
    //     image: `/assets/currencies/${
    //       component.pair_id.toLowerCase().split("/")[0]
    //     }.svg`,
    //     type: "Crypto",
    //     ticker: component.pair_id.replace("/", ""),
    //     source: component.source,
    //     lastUpdated: lastUpdated,
    //     price: parseInt(component.price, 16) / 10 ** component.decimals,
    //     dailyUpdates: component.daily_updates,
    //   };
    // })
  };
};
