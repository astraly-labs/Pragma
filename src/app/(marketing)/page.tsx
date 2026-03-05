import { cn } from "@/lib/utils";
import BoxContainer from "@/components/common/BoxContainer";
import Hero from "@/components/Landing/Hero";
import MarqueeLogo from "@/components/Landing/MarqueeLogo";
import { MetricsBar } from "@/components/Landing/MetricsBar";
import CodeSnippet from "@/components/Landing/CodeSnippet";
import Architecture from "@/components/Landing/Architecture";
import Testimonial from "@/components/Landing/Testimonial/Testimonial";
import Blog from "@/components/Landing/Blog/Blog";
import Events from "@/components/Landing/Events";
import ReadyBox from "@/components/common/ReadyBox";
import { AssetsSection } from "./_components/assets-section";
import { PriceFeeds } from "./_components/price-feeds";
import StartBuilding from "./_components/start-building";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ScrollProgress } from "@/components/Landing/ScrollProgress";

const IndexPage = () => {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-hidden",
        "mx-auto max-w-[1700px]"
      )}
    >
      <ScrollProgress />
      <Hero />
      <ScrollReveal>
        <BoxContainer>
          <MarqueeLogo />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <BoxContainer>
          <MetricsBar />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <PriceFeeds />
          <AssetsSection />
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
