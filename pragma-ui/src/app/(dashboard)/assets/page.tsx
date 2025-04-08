import { Suspense } from "react";

import AssetHero from "@/components/common/AssetHero";
import BoxContainer from "@/components/common/BoxContainer";
import { getTokens } from "./_helpers/getTokens";
import { getPublishers } from "./_helpers/getPublishers";
import { AssetsTable } from "./_components/assets-table";
import PublishersTable from "./_components/publishers-table";
import { PublisherList } from "./_components/publisher-list";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { CustomError } from "./_components/custom-error";
import AssetList from "./_components/asset-list";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const options = ["sepolia", "mainnet", "api"];

const AssetsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const source = ((await searchParams).source as string) || options[1];

  return (
    <div className="relative flex w-full max-w-[1700px] flex-col items-start gap-[10px] overflow-x-hidden rounded-[20px] border border-[rgba(181,240,229,0.12)] bg-[rgba(27,99,82,0.12)] p-[36px]">
      <AssetHero
        title="Every asset"
        greenTitle="priced the best way"
        description="Explore the assets supported by Pragma, priced in the most efficient way. Best pricing, no fluff."
        solidButton="Read docs"
        solidButtonLink="https://docs.pragma.build"
        illustrationLink="/assets/vectors/chart.svg"
        illustrationSmallLink="/assets/vectors/chartSmall.svg"
      />
      <BoxContainer>
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
      </BoxContainer>
      <BoxContainer>
        {source !== "api" && (
          <ErrorBoundary errorComponent={CustomError}>
            <Suspense
              fallback={
                <PublisherList
                  options={options}
                  publishers={[]}
                  selectedSource={source}
                  loading
                />
              }
            >
              <Publishers source={source} />
            </Suspense>
          </ErrorBoundary>
        )}
      </BoxContainer>
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
  const initialPublishers = await getPublishers(source);

  return (
    <PublishersTable
      options={options}
      source={source}
      initialPublishers={initialPublishers}
    />
  );
};

export default AssetsPage;
