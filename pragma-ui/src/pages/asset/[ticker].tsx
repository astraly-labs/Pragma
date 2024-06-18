import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";
import AssetChart from "../../components/Assets/AssetChart";
import PriceComponent from "../../components/Assets/PriceComponent";
import Checkpoints from "../../components/Assets/Checkpoints";
import { CheckpointT, initialAssets, useData } from "../../providers/data";
import { COINGECKO_MAPPING_IDS } from "../../utils/types";

export interface Asset {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  sources: number;
  variations: {
    past1h: number;
    past24h: number;
    past7d: number;
  };
  chart: string;
  ema: string;
  macd: string;
}

interface Props {
  ticker: string;
}

interface PriceComponents {
  publisher: string;
  link: string;
  source: string;
  price: number;
  hash: string;
  lastUpdated: number;
}

interface CheckpointComponent {
  hash: string;
  price: number;
  date: string;
  hour: string;
  signer: string;
}

const AssetPage = ({ ticker }: Props) => {
  const router = useRouter();
  const { data, loading, checkpoints, error } = useData();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [priceComponents, setPriceComponents] = useState<PriceComponents[]>([]);
  const [checkpointComponents, setCheckpointComponents] = useState<
    CheckpointComponent[]
  >([]);

  useEffect(() => {
    if (data && ticker) {
      const assetData = data[ticker];
      if (assetData) {
        const formattedAsset: Asset = {
          image: `/assets/currencies/${ticker.toLowerCase().split("/")[0]}.svg`,
          type: "Crypto",
          ticker,
          lastUpdated: new Date(
            assetData.last_updated_timestamp * 1000
          ).toLocaleString(),
          price: assetData.price,
          sources: assetData.nb_sources_aggregated || 0,
          variations: {
            past1h: assetData.variations?.past1h || 0,
            past24h: assetData.variations?.past24h || 0,
            past7d: assetData.variations?.past7d || 0,
          },
          chart: `https://www.coingecko.com/coins/${COINGECKO_MAPPING_IDS[ticker.toLowerCase().split("/")[0]]
            }/sparkline.svg`,
          ema: "soon",
          macd: "soon",
        };
        setAsset(formattedAsset);

        const assetComponents: PriceComponents[] = assetData.components.map(
          (component: any) => {
            return {
              publisher: component.publisher,
              link: component.link,
              source: component.source,
              price: Number.parseFloat(component.price).toFixed(0),
              hash: component.tx_hash,
              lastUpdated: new Date(
                component.timestamp * 1000
              ).toLocaleString(),
            };
          }
        );

        setPriceComponents(assetComponents);
      }
    }
  }, [data, ticker]);

  useEffect(() => {
    if (checkpoints && ticker) {
      const checkpointsData = checkpoints[ticker];
      if (checkpointsData) {
        const formattedCheckpoints: CheckpointComponent[] = checkpointsData.map(
          (checkpoint: CheckpointT) => {
            return {
              hash: checkpoint.tx_hash,
              price: Number.parseFloat(checkpoint.price),
              date: new Date(checkpoint.timestamp * 1000).toLocaleDateString(),
              hour: new Date(checkpoint.timestamp * 1000).toLocaleTimeString(),
              signer: checkpoint.sender_address,
            };
          }
        );

        setCheckpointComponents(formattedCheckpoints);
      }
    }
  }, [checkpoints, ticker]);

  if (loading || !asset) {
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
            <div className="my-auto  h-20 w-full animate-pulse rounded-xl bg-lightBlur md:w-80"></div>
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
        <AssetHeader isAsset={true} asset={asset} />
      </BoxContainer>
      <BoxContainer>
        <AssetChart asset={asset} />
      </BoxContainer>
      <div className="w-full pb-5" />
      <BoxContainer className="relative" modeOne={false}>
        <PriceComponent components={priceComponents} />
        {/* <div className="absolute top-0 left-2/4 z-0 h-full w-screen -translate-x-1/2 bg-lightBackground" /> */}
      </BoxContainer>
      <BoxContainer>
        <Checkpoints components={checkpointComponents} />
      </BoxContainer>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for each asset's ticker
  const paths = initialAssets.map((asset) => ({
    params: { ticker: asset.ticker },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Pass the ticker as props to the component
  const ticker = params?.ticker;
  return { props: { ticker } };
};

export default AssetPage;
