import { ScrollReveal } from "@/components/common/ScrollReveal";
import { fetchStakingData } from "@/lib/fetchStakingData";
import type { StakingDataSerialized } from "@/lib/staking";
import { StakingHero } from "./_components/StakingHero";
import { StakingStats } from "./_components/StakingStats";
import { DelegationPool } from "./_components/DelegationPool";
import { EpochProgress } from "./_components/EpochProgress";
import { StrkChart } from "./_components/StrkChart";
import { StakeBreakdown } from "./_components/StakeBreakdown";
import { StakingTabs } from "./_components/StakingTabs";

async function getStakingData(): Promise<StakingDataSerialized | null> {
  try {
    return await fetchStakingData();
  } catch (error) {
    console.error("Failed to fetch staking data:", error);
    return null;
  }
}

export const revalidate = 30;

export default async function StakingPage() {
  const data = await getStakingData();

  return (
    <div className="relative flex w-full max-w-[1700px] flex-col items-start gap-4 overflow-x-hidden px-3 pt-20 pb-8 sm:gap-6 sm:px-6 sm:pt-28 md:px-8">
      <ScrollReveal direction="down" className="w-full">
        <StakingHero data={data} />
      </ScrollReveal>

      {data && (
        <>
          <ScrollReveal delay={0.1} className="w-full">
            <StakingStats data={data} />
          </ScrollReveal>

          <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <ScrollReveal delay={0.15} className="w-full">
              <StrkChart />
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="w-full">
              <StakeBreakdown data={data} />
            </ScrollReveal>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <ScrollReveal delay={0.25} className="w-full">
              <DelegationPool data={data} />
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="w-full">
              <EpochProgress data={data} />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.35} className="w-full">
            <StakingTabs />
          </ScrollReveal>
        </>
      )}
    </div>
  );
}
