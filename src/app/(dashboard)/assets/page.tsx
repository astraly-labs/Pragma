import { Suspense } from "react";

import AssetHero from "@/components/common/AssetHero";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { getTokens } from "./_helpers/getTokens";
import { getPublishers } from "./_helpers/getPublishers";
import { AssetsTable } from "./_components/assets-table";
import PublishersTable from "./_components/publishers-table";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { CustomError } from "./_components/custom-error";
import AssetList from "./_components/asset-list";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const options = ["mainnet", "api"];

const AssetsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const source = ((await searchParams).source as string) || options[0];

  return (
    <div className="relative flex w-full max-w-[1700px] flex-col items-start gap-6 overflow-x-hidden p-4 sm:p-8">
      <ScrollReveal direction="down" className="w-full">
        <AssetHero
          title="Every asset"
          greenTitle="priced the best way"
          description="Explore the assets supported by Pragma, priced in the most efficient way. Best pricing, no fluff."
          solidButton="Read docs"
          solidButtonLink="https://docs.pragma.build"
          illustrationLink="/assets/vectors/chart.svg"
          illustrationSmallLink="/assets/vectors/chartSmall.svg"
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="w-full">
        <Suspense
          fallback={
            <AssetList
              options={options}
              assets={[]}
              selectedSource={source}
              loading
            />
          }
        >
          <Tokens source={source} />
        </Suspense>
      </ScrollReveal>
      <ScrollReveal delay={0.2} className="w-full">
        {source !== "api" && (
          <ErrorBoundary errorComponent={CustomError}>
            <Suspense
              fallback={
                <div className="w-full py-16 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-lightGreen/20 border-t-mint" />
                  <p className="mt-3 font-mono text-sm text-lightGreen/50">
                    Loading providers...
                  </p>
                </div>
              }
            >
              <Publishers source={source} />
            </Suspense>
          </ErrorBoundary>
        )}
      </ScrollReveal>
    </div>
  );
};

const Tokens = async ({ source }: { source: string }) => {
  const initialtokens = await getTokens(source);

  return (
    <AssetsTable
      options={options}
      source={source}
      initialTokens={initialtokens}
    />
  );
};

const Publishers = async ({ source }: { source: string }) => {
  const initialPublishers = await getPublishers(source, "Spot");

  return (
    <PublishersTable
      options={options}
      source={source}
      initialPublishers={initialPublishers}
    />
  );
};

export default AssetsPage;
