import { cn } from "@/lib/utils";
import { INITIAL_ASSETS } from "@/lib/constants";
import BoxContainer from "@/components/common/BoxContainer";
import Hero from "@/components/Landing/Hero";
import MarqueeLogo from "@/components/Landing/MarqueeLogo";
import CodeSnippet from "@/components/Landing/CodeSnippet";
import Architecture from "@/components/Landing/Architecture";
import Testimonial from "@/components/Landing/Testimonial/Testimonial";
import Blog from "@/components/Landing/Blog/Blog";
import Events from "@/components/Landing/Events";
import ReadyBox from "@/components/common/ReadyBox";
import { fetchAsset } from "./_helpers/fetch-asset";
import { AssetsSection } from "./_components/assets-section";
import { PriceFeeds } from "./_components/price-feeds";
import StartBuilding from "./_components/start-building";
import styles from "@/pages/styles.module.scss";

const getInitialAssets = async () => {
  const results = await Promise.all(
    INITIAL_ASSETS.map((asset) => fetchAsset(asset.ticker, asset.decimals))
  );

  return results;
};

const IndexPage = async () => {
  const assets = await getInitialAssets();

  return (
    <div className={cn("relative w-full overflow-x-hidden", styles.bigScreen)}>
      <Hero />
      <BoxContainer>
        <MarqueeLogo />
      </BoxContainer>
      <BoxContainer>
        <PriceFeeds />
        <AssetsSection initialData={assets} />
      </BoxContainer>
      <BoxContainer>
        <CodeSnippet />
        <StartBuilding />
      </BoxContainer>
      <BoxContainer>
        <Architecture />
      </BoxContainer>
      <BoxContainer>
        <Testimonial />
      </BoxContainer>
      <Blog />
      <BoxContainer>
        <Events />
      </BoxContainer>
      <BoxContainer>
        <ReadyBox version={true} />
      </BoxContainer>
    </div>
  );
};

export default IndexPage;
