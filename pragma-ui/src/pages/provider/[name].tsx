import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";
import PairReported from "../../components/Assets/PairReported";
import { useData } from "../../providers/data";
import moment from "moment";
import { getPublisherType } from "../../utils";

interface DataProviders {
  image: string;
  type: string;
  name: string;
  link: string;
  lastUpdated: string;
  reputationScore: string;
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
  const { name, network } = router.query;

  const { loading, publishers, switchSource, currentSource } = useData();
  const [publisher, setPublisher] = useState<DataProviders | null>(null);
  const [pairsReported, setPairsReported] = useState<PairsReported[]>([]);

  useEffect(() => {
    if (
      network &&
      (network === "sepolia" || network === "mainnet") &&
      network !== currentSource
    ) {
      switchSource(network);
    }
  }, [network, currentSource, switchSource]);

  useEffect(() => {
    if (!publishers) {
      const timer = setTimeout(() => {
        router.push("/404");
      }, 20000); // 20 seconds delay

      // Cleanup the timer if the component unmounts before the 10 seconds
      return () => clearTimeout(timer);
    }
    // Find the publisher with the given name
    const foundPublisher = publishers?.find(
      (publisher) =>
        publisher.publisher.toLowerCase() === (name as string).toLowerCase()
    );

    if (foundPublisher === undefined) {
      setPublisher(null);
    } else {
      const lastUpdated = moment(
        foundPublisher.last_updated_timestamp * 1000
      ).fromNow(); // Using moment.js to format time
      setPublisher({
        image: `/assets/publishers/${foundPublisher.publisher.toLowerCase()}.svg`,
        type: getPublisherType(foundPublisher.type),
        link: foundPublisher.website_url,
        name: foundPublisher.publisher,
        lastUpdated: lastUpdated,
        reputationScore: "soon",
        nbFeeds: foundPublisher.nb_feeds,
        dailyUpdates: foundPublisher.daily_updates,
        totalUpdates: foundPublisher.total_updates,
      });

      setPairsReported(
        foundPublisher.components.map((component) => {
          const lastUpdated = moment(
            component.last_updated_timestamp * 1000
          ).fromNow(); // Using moment.js to format time
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
        })
      );
    }
  }, [publishers, router, currentSource, name]);

  // Render loading state if asset is not yet fetched
  if (loading || !publisher) {
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
          <div
            className={classNames(
              "w-full flex-col justify-between gap-8 md:flex-row md:gap-5",
              styles.greenBox
            )}
          >
            <div className="flex flex-row gap-4">
              <div className="my-auto  h-20 w-20 animate-pulse rounded-full bg-lightBlur"></div>
              <div className="flex flex-col gap-2">
                <div className="my-auto  h-10 w-28 animate-pulse rounded-full bg-lightBlur"></div>
                <div className="my-auto  h-5 w-14 animate-pulse rounded-full bg-lightBlur"></div>
              </div>
            </div>
            <div className="my-auto  h-20 w-full animate-pulse rounded-full bg-lightBlur md:w-80"></div>
          </div>
        </BoxContainer>
        <BoxContainer>
          <div className="my-auto  mt-8 h-80 w-full animate-pulse rounded-xl bg-lightBlur"></div>
        </BoxContainer>
        <BoxContainer>
          <div className="my-auto  mt-8 h-80 w-full animate-pulse rounded-xl bg-lightBlur"></div>
        </BoxContainer>
      </div>
    );
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
