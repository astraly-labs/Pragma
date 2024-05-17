import { useRouter } from "next/router";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { dataProviders } from "../assets";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";
import AssetChart from "../../components/Assets/AssetChart";
import PriceComponent from "../../components/Assets/PriceComponent";
import Checkpoints from "../../components/Assets/Checkpoints";

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

const priceComponents: PriceComponents[] = [
  {
    publisher: "Publisher 1",
    link: "https://pragma.build",
    source: "Source 1",
    price: 100,
    hash: "9dg8As93thNPse9gCVsda9fEV3rSz0372ADFADF3F",
    lastUpdated: 1627849281,
  },
  {
    publisher: "Publisher 2",
    source: "Source 2",
    link: "https://pragma.build",
    price: 200,
    hash: "9dg8As93thNPse9gCVsda9fEV3rSz0372ADFADF3F",
    lastUpdated: 1627849381,
  },
  {
    publisher: "Publisher 3",
    link: "https://pragma.build",
    source: "Source 3",
    price: 300,
    hash: "9dg8As93thNPse9gCVsda9fEV3rSz0372ADFADF3F",
    lastUpdated: 1627849481,
  },
];

const checkpointComponents: CheckpointComponent[] = [
  {
    hash: "9dg8As93thNPse9gCVsda9fEV3rSz0372ADFADF3F",
    price: 100,
    date: "12 MAY 2023",
    hour: "12:13",
    signer: "0x47238...32A4",
  },
  {
    hash: "9dg8As93thNPse9gCVsda9fEV3rSz0372ADFADF3F",
    price: 100,
    date: "12 MAY 2023",
    hour: "12:13",
    signer: "0x47238...32A4",
  },
  {
    hash: "9dg8As93thNPse9gCVsda9fEV3rSz0372ADFADF3F",
    price: 100,
    date: "12 MAY 2023",
    hour: "12:13",
    signer: "0x47238...32A4",
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
