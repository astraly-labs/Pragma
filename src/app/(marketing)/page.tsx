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

const IndexPage = async () => {
  const assets = await getInitialAssets();

  return (
    <div
      className={cn(
        "relative w-full overflow-x-hidden",
        "mx-auto max-w-[1700px]"
      )}
    >
      <Hero />
      <ScrollReveal>
        <BoxContainer>
          <MarqueeLogo />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <PriceFeeds />
          <AssetsSection initialData={assets} />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <CodeSnippet />
          <StartBuilding />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal>
        <BoxContainer>
          <Architecture />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal>
        <BoxContainer>
          <Testimonial />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal>
        <Blog />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <Events />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal>
        <BoxContainer>
          <ReadyBox version={true} />
        </BoxContainer>
      </ScrollReveal>
    </div>
  );
};

export default IndexPage;
