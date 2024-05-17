import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { assets } from "../assets";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";
import AssetChart from "../../components/Assets/AssetChart";
import PriceComponent from "../../components/Assets/PriceComponent";
import Checkpoints from "../../components/Assets/Checkpoints";

interface Asset {
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
}

interface Props {
  asset: Asset;
}

interface PriceComponent {
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

const priceComponents: PriceComponent[] = [
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

const AssetPage = ({ asset }: Props) => {
  const router = useRouter();
  const { ticker } = router.query;

  // Render loading state if asset is not yet fetched
  if (!asset) {
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
        <AssetHeader isAsset={true} assets={asset} />
      </BoxContainer>
      <BoxContainer>
        <AssetChart assets={asset} />
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
  const paths = assets.map((asset) => ({
    params: { ticker: asset.ticker },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch data for the specific asset based on its ticker
  const ticker = params?.ticker;
  const asset = assets.find((asset) => asset.ticker === ticker);

  // Pass the asset data as props to the component
  return { props: { asset } };
};

export default AssetPage;
