import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import BoxContainer from "@/components/common/BoxContainer";
import styles from "@/pages/styles.module.scss";
import AssetHeader from "@/components/Assets/AssetHeader";
import PairReported from "@/components/Assets/PairReported";
import { getPublisher } from "./_helpers/getPublisher";
import Loading from "./loading";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ [key: string]: string | string[] | undefined }>;

type ProviderPageProps = {
  searchParams: SearchParams;
  params: Params;
};

const DEFAULT_SOURCE = SUPPORTED_SOURCES[1];

const ProviderPage = async (props: ProviderPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const network = (searchParams.network as string) || DEFAULT_SOURCE;
  const nameParam = params.name as string;

  const data = await getPublisher(nameParam, network);

  if (!data) {
    return <Loading />;
  }

  const { publisher, pairs } = data;

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden pt-24 md:pt-40",
        styles.bigScreen
      )}
    >
      <BoxContainer>
        <Link
          href="/assets"
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
        <AssetHeader asset={publisher} isAsset={false} />
      </BoxContainer>
      {pairs && (
        <BoxContainer>
          <PairReported components={pairs} />
        </BoxContainer>
      )}
    </div>
  );
};

export default ProviderPage;
