import { Suspense } from "react";

import AssetHero from "@/components/common/AssetHero";
import BoxContainer from "@/components/common/BoxContainer";
import { getTokens } from "./_helpers/getTokens";
import { getPublishers } from "./_helpers/getPublishers";
import { AssetsTable } from "./_components/assets-table";
import PublishersTable from "./_components/publishers-table";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const options = ["sepolia", "mainnet", "api"];

const AssetsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const source = (await searchParams).source as string;

  const initialtokens = await getTokens(source);
  const initialPublishers = await getPublishers(source);

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
        <Suspense fallback={<>Loading...</>}>
          <AssetsTable
            options={options}
            source={source}
            initialTokens={initialtokens}
          />
        </Suspense>
      </BoxContainer>
      {source !== "api" && (
        <BoxContainer>
          <Suspense fallback={<>Loading...</>}>
            <PublishersTable
              options={options}
              source={source}
              initialPublishers={initialPublishers}
            />
          </Suspense>
        </BoxContainer>
      )}
    </div>
  );
};

export default AssetsPage;
