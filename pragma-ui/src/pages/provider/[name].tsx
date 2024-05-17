import { useRouter } from "next/router";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { dataProviders } from "../assets";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";
import PairReported from "../../components/Assets/PairReported";

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

interface Props {
  dataP: DataProviders;
}

interface PairsReported {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  dailyUpdates: number;
}

const PairsReport: PairsReported[] = [
  {
    image: "/assets/currencies/btc.svg",
    type: "Crypto",
    ticker: "BTCUSD",
    lastUpdated: "<1s ago",
    price: 62402,
    dailyUpdates: 1000,
  },
  {
    image: "/assets/currencies/sol.svg",
    type: "Crypto",
    ticker: "SOLUSD",
    lastUpdated: "<1s ago",
    price: 149,
    dailyUpdates: 1000,
  },
  {
    image: "/assets/currencies/eth.svg",
    type: "Crypto",
    ticker: "ETHUSD",
    lastUpdated: "<1s ago",
    price: 3078.21,
    dailyUpdates: 1000,
  },
];

const ProviderPage = ({ dataP }: Props) => {
  const router = useRouter();

  // Render loading state if asset is not yet fetched
  if (!dataP) {
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
        <AssetHeader isAsset={false} assets={dataP} />
      </BoxContainer>
      <BoxContainer>
        <PairReported components={PairsReport} />
      </BoxContainer>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for each asset's ticker
  const paths = dataProviders.map((dataP) => ({
    params: { name: dataP.name },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch data for the specific asset based on its ticker
  const name = params?.name;
  const dataP = dataProviders.find((dataP) => dataP.name === name);

  // Pass the asset data as props to the component
  return { props: { dataP } };
};

export default ProviderPage;
