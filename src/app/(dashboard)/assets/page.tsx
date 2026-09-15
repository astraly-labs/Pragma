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
import {
  EXPLORER_NETWORKS,
  SUPPORTED_SOURCES,
  explorerSource,
} from "@/lib/explorer-networks";
import MidenDeployment from "@/components/Assets/MidenDeployment";
import { pageMetadata } from "@/lib/metadata";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const options = SUPPORTED_SOURCES;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const source = explorerSource((await searchParams).source);
  const network = EXPLORER_NETWORKS[source];
  return pageMetadata(
    `${network} oracle price feeds`,
    source === "miden"
      ? `Explore Pragma oracle price feeds on ${network}. Browse supported assets, view oracle medians, and inspect the current deployment.`
      : "Explore Pragma oracle price feeds on Starknet mainnet. Browse supported assets, data publishers, and onchain source observations.",
    source === "miden" ? "/assets?source=miden" : "/assets",
    `/assets/opengraph-image?source=${source}&v=20260915&deployment=${encodeURIComponent(network)}`
  );
}

const AssetsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const requestedSource = (await searchParams).source;
  const source = explorerSource(requestedSource);

  return (
    <div className="explorer-page explorer-directory">
      <ScrollReveal direction="down" className="w-full">
        <AssetHero
          title="The data behind"
          greenTitle="every decision."
          description={`Inspect oracle prices on ${EXPLORER_NETWORKS[source]}.`}
          eyebrow={`${EXPLORER_NETWORKS[source]} / Data explorer`}
          solidButton="Read docs"
          solidButtonLink={
            source === "miden"
              ? "https://docs.pragma.build/miden/introduction"
              : "https://docs.pragma.build"
          }
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="w-full">
        <Suspense
          key={source}
          fallback={
            <AssetList
              options={options}
              assets={[]}
              selectedSource={source}
              loading
            />
          }
        >
          <ErrorBoundary errorComponent={CustomError}>
            <Tokens source={source} />
          </ErrorBoundary>
        </Suspense>
      </ScrollReveal>
      <ScrollReveal delay={0.2} className="w-full">
        {source === "miden" ? (
          <MidenDeployment />
        ) : (
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
      key={source}
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
