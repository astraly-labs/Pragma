import Image from "next/image";
import classNames from "classnames";
import styles from "@/pages/styles.module.scss";
import { AssetHeader } from "./_components/asset-header";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import BoxContainer from "@/components/common/BoxContainer";
import Link from "next/link";
import { getCheckpoints } from "./_helpers/getCheckpoints";
import { notFound } from "next/navigation";
import { getAsset } from "./_helpers/getAsset";
import { AssetChart } from "./_components/asset-chart";
import { Checkpoints } from "./_components/checkpoints";
import { PriceTable } from "./_components/price-table";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ [key: string]: string | string[] | undefined }>;

type AssetPageProps = {
  searchParams: SearchParams;
  params: Params;
};

const DEFAULT_SOURCE = SUPPORTED_SOURCES[2];

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

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden pt-24 md:pt-40",
        styles.bigScreen
      )}
    >
      <BoxContainer>
        <Link
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
      <BoxContainer>
        <AssetHeader asset={asset} />
      </BoxContainer>

      {asset?.isUnsupported ? (
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
      ) : asset?.error ? (
        <BoxContainer>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-2xl font-bold text-redDown">Error</div>
            <div className="text-lg text-lightGreen">
              There was an error fetching data for this asset: {asset.error}
            </div>
          </div>
        </BoxContainer>
      ) : (
        <>
          <BoxContainer>
            <AssetChart asset={asset} currentSource={network} />
          </BoxContainer>
          <div className="w-full pb-5" />
          {network !== "api" && (
            <>
              {asset.components && asset.decimals && (
                <BoxContainer className="relative" modeOne={false}>
                  <PriceTable
                    components={asset.components}
                    decimals={asset.decimals}
                  />
                </BoxContainer>
              )}
              <BoxContainer>
                <Checkpoints components={checkpoints} />
              </BoxContainer>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AssetPage;
