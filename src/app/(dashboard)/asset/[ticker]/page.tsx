import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { getCheckpoints } from "./_helpers/getCheckpoints";
import { getAsset } from "./_helpers/getAsset";
import { AssetHeader } from "./_components/asset-header";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import BoxContainer from "@/components/common/BoxContainer";
import { AssetChart } from "./_components/asset-chart";
import { Checkpoints } from "./_components/checkpoints";
import { PriceTable } from "./_components/price-table";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ [key: string]: string | string[] | undefined }>;

type AssetPageProps = {
  searchParams: SearchParams;
  params: Params;
};

const DEFAULT_SOURCE = SUPPORTED_SOURCES[1];

const AssetPage = async (props: AssetPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const network = (searchParams.network as string) || DEFAULT_SOURCE;
  const tickerParam = params.ticker;

  if (!tickerParam || typeof tickerParam !== "string") {
    return notFound();
  }

  const ticker = tickerParam.replace("-", "%2F");

  const asset = await getAsset({
    ticker,
    source: network,
  });

  const checkpoints = await getCheckpoints({
    ticker,
    source: network,
  });

  const isApi = network === "api";
  const isMainnet = network === "mainnet";

  return (
    <div
      className={clsx(
        "relative w-full overflow-x-hidden pt-24 md:pt-40",
        "mx-auto max-w-[1700px]"
      )}
    >
      <ScrollReveal direction="none">
        <BoxContainer>
          <Link
            prefetch
            href={`/assets?source=${network}`}
            className="flex w-full cursor-pointer items-center gap-2 text-left text-sm uppercase tracking-widest text-lightGreen"
          >
            <Image
              className="my-auto pl-2"
              height={30}
              width={30}
              alt="arrowDown"
              src="/assets/vectors/prev.svg"
            />
            Back to feeds
          </Link>
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <AssetHeader asset={asset} />
        </BoxContainer>
      </ScrollReveal>

      {asset?.isUnsupported ? (
        <ScrollReveal delay={0.2}>
          <BoxContainer>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 text-2xl font-bold text-redDown">
                Unsupported Asset
              </div>
              <div className="text-lg text-lightGreen">
                This asset is not currently supported by the Pragma API.
              </div>
            </div>
          </BoxContainer>
        </ScrollReveal>
      ) : asset?.error ? (
        <ScrollReveal delay={0.2}>
          <BoxContainer>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 text-2xl font-bold text-redDown">Error</div>
              <div className="text-lg text-lightGreen">
                There was an error fetching data for this asset: {asset.error}
              </div>
            </div>
          </BoxContainer>
        </ScrollReveal>
      ) : (
        <>
          {isApi && (
            <ScrollReveal delay={0.2}>
              <BoxContainer>
                <AssetChart asset={asset} currentSource={network} />
              </BoxContainer>
            </ScrollReveal>
          )}
          <div className="w-full pb-5" />
          {asset.components && asset.decimals && (
            <ScrollReveal delay={0.3}>
              <BoxContainer className="relative" modeOne={false}>
                <PriceTable
                  components={asset.components}
                  decimals={asset.decimals}
                  network={network}
                />
              </BoxContainer>
            </ScrollReveal>
          )}
          {isMainnet && (
            <ScrollReveal delay={0.4}>
              <BoxContainer>
                <Checkpoints components={checkpoints} />
              </BoxContainer>
            </ScrollReveal>
          )}
        </>
      )}
    </div>
  );
};

export default AssetPage;
