import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { assets } from "../assets";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";
import Image from "next/image";
import AssetHeader from "../../components/Assets/AssetHeader";

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
        "relative w-full overflow-x-hidden pt-40",
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
