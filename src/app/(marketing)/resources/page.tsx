import BoxContainer from "@/components/common/BoxContainer";
import ResourcesHero from "@/components/Resources/ResourcesHero";
import ReadyBox from "@/components/common/ReadyBox";
import CompFeedBox from "@/components/Resources/CompFeedBox";
import VerifRandBox from "@/components/Resources/VerifRandBox";
import Blog from "@/components/Landing/Blog/Blog";
import { PriceFeed } from "./price-feed";
import { cn } from "@/lib/utils";
import { INITIAL_ASSETS } from "@/lib/constants";
import { fetchAsset } from "../_helpers/fetch-asset";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const getInitialAssets = async () => {
  try {
    const results = await Promise.all(
      INITIAL_ASSETS.map((asset) => fetchAsset(asset.ticker, asset.decimals))
    );
    return results;
  } catch {
    return INITIAL_ASSETS.map((asset) => ({
      ticker: asset.ticker,
      lastPrice: 0,
      variation24h: null,
      relativeVariation24h: null,
      priceData: [],
    }));
  }
};

const EcosystemPage = async () => {
  const assets = await getInitialAssets();

  return (
    <div
      className={cn(
        "relative w-full overflow-x-hidden",
        "mx-auto max-w-[1700px]"
      )}
    >
      <ResourcesHero
        title="Build, build, build"
        description="If you want to learn more about Pragma, start to build or work on new ideas, you're in the right place"
        solidButton="Read docs"
        solidButtonLink="https://docs.pragma.build"
        illustrationLink="/assets/vectors/resources.svg"
        illustrationSmallLink="/assets/vectors/resourcesSmall.svg"
      />
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <PriceFeed initialData={assets} />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <BoxContainer>
          <CompFeedBox />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <BoxContainer>
          <VerifRandBox />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.25}>
        <div className="p-10" />
        <Blog />
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <BoxContainer>
          <ReadyBox version={false} />
        </BoxContainer>
      </ScrollReveal>
    </div>
  );
};

export default EcosystemPage;
