import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";
import PairReported from "../../components/Assets/PairReported";
import { PublisherT, useData } from "../../providers/data";
import moment from "moment";
import { getPublisherType } from "../../utils";

interface DataProviders {
  image: string;
  type: string;
  name: string;
  link: string;
  lastUpdated: string;
  reputationScore: number;
  nbFeeds: number;
  dailyUpdates: number;
  totalUpdates: number;
}

interface PairsReported {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  dailyUpdates: number;
}

const ProviderPage = () => {
  const router = useRouter();

  const { loading, publishers } = useData();
  const [publisher, setPublisher] = useState<DataProviders | null>(null);
  const [pairsReported, setPairsReported] = useState<PairsReported[]>([]);

  useEffect(() => {
    if (!publishers) {
      router.push("/404");
    }
    // Find the publisher with the given name
    const foundPublisher = publishers.find(
      (publisher) => publisher.publisher.toLowerCase() === router.query.name.toLowerCase()
    );
    console.log(foundPublisher);
    if (foundPublisher === undefined) {
      setPublisher(null);
    } else {
      const lastUpdated = moment(foundPublisher.last_updated_timestamp * 1000).fromNow(); // Using moment.js to format time
      setPublisher({
        image: `/assets/publishers/${foundPublisher.publisher.toLowerCase()}.svg`,
        type: getPublisherType(foundPublisher.type),
        link: foundPublisher.website_url,
        name: foundPublisher.publisher,
        lastUpdated: lastUpdated,
        reputationScore: null,
        nbFeeds: foundPublisher.nb_feeds,
        dailyUpdates: foundPublisher.daily_updates,
        totalUpdates: foundPublisher.total_updates,
      });

      setPairsReported(
        foundPublisher.components.map((component) => {
          const lastUpdated = moment(component.last_updated_timestamp * 1000).fromNow(); // Using moment.js to format time
          return {
            image: `/assets/currencies/${component.pair_id.toLowerCase().split("/")[0]}.svg`,
            type: "Crypto",
            ticker: component.pair_id.replace("/", ""),
            lastUpdated: lastUpdated,
            price: Number.parseFloat(component.price),
            dailyUpdates: 0,
          };
        })
      );
    }

  }, [publishers]);

  // Render loading state if asset is not yet fetched
  if (loading || !publisher) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden pt-24 md:pt-40",
        styles.bigScreen
      )}
    >
      <BoxContainer>
        <button
          onClick={() => {
            // Go back to the previous page
            router.back();
          }}
          className="flex w-full cursor-pointer items-center gap-2 text-left text-sm uppercase tracking-widest text-lightGreen"
        >
          <Image
            className="my-auto pl-2"
            height={30}
            width={30}
            alt="arrowDown"
            src="/assets/vectors/prev.svg"
          />
          Back to feeds
        </button>
      </BoxContainer>
      <BoxContainer>
        <AssetHeader isAsset={false} asset={publisher} />
      </BoxContainer>
      <BoxContainer>
        <PairReported components={pairsReported} />
      </BoxContainer>
    </div>
  );
};

export default ProviderPage;
