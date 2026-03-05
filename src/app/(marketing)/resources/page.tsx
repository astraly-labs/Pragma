import BoxContainer from "@/components/common/BoxContainer";
import ResourcesHero from "@/components/Resources/ResourcesHero";
import ReadyBox from "@/components/common/ReadyBox";
import CompFeedBox from "@/components/Resources/CompFeedBox";
import VerifRandBox from "@/components/Resources/VerifRandBox";
import Blog from "@/components/Landing/Blog/Blog";
import PriceFeedBox from "@/components/Resources/PriceFeedBox";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const ResourcesPage = () => {
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
          <PriceFeedBox />
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

export default ResourcesPage;
