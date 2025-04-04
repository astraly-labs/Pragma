import BoxContainer from "@/components/common/BoxContainer";
import ResourcesHero from "@/components/Resources/ResourcesHero";
import ReadyBox from "@/components/common/ReadyBox";
import CompFeedBox from "@/components/Resources/CompFeedBox";
import VerifRandBox from "@/components/Resources/VerifRandBox";
import Blog from "@/components/Landing/Blog/Blog";
import styles from "@/pages/styles.module.scss";
import { PriceFeed } from "./price-feed";
import { cn } from "@/lib/utils";
import { INITIAL_ASSETS } from "@/lib/constants";
import { fetchAsset } from "../_helpers/fetch-asset";

const getInitialAssets = async () => {
  const results = await Promise.all(
    INITIAL_ASSETS.map((asset) => fetchAsset(asset.ticker, asset.decimals))
  );

  return results;
};

const EcosystemPage = async () => {
  const assets = await getInitialAssets();

  return (
    <div className={cn("relative w-full overflow-x-hidden", styles.bigScreen)}>
      <ResourcesHero
        title="Build, build, build"
        description="If you want to learn more about Pragma, start to build or work on new ideas, you’re in the right place"
        solidButton="Read docs"
        solidButtonLink="https://docs.pragma.build"
        illustrationLink="/assets/vectors/resources.svg"
        illustrationSmallLink="/assets/vectors/resourcesSmall.svg"
      />
      <BoxContainer>
        <PriceFeed initialData={assets} />
      </BoxContainer>
      <BoxContainer>
        <CompFeedBox />
      </BoxContainer>
      <BoxContainer>
        <VerifRandBox />
      </BoxContainer>
      <div className="p-10" />
      <Blog />
      <BoxContainer>
        <ReadyBox version={false} />
      </BoxContainer>
    </div>
  );
};

export default EcosystemPage;
