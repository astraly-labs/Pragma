import { pageMetadata } from "@/lib/metadata";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { SUPPORTED_SOURCES } from "@/lib/constants";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import BoxContainer from "@/components/common/BoxContainer";
import PairReported from "@/components/Assets/PairReported";
import { getPublisher } from "./_helpers/getPublisher";
import { notFound } from "next/navigation";
import { PublisherHeader } from "./_components/publisher-header";
import { getPublisherName } from "@/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ [key: string]: string | string[] | undefined }>;

type ProviderPageProps = {
  searchParams: SearchParams;
  params: Params;
};

export async function generateMetadata({ params }: ProviderPageProps) {
  const { name } = await params;
  if (typeof name !== "string" || !name) return notFound();
  const displayName = getPublisherName(name);
  return pageMetadata(
    `${displayName} oracle data publisher`,
    `Explore ${displayName} on Pragma’s Starknet oracle. Inspect reported pairs and available publisher observations.`,
    `/provider/${encodeURIComponent(displayName)}`
  );
}

const DEFAULT_SOURCE = SUPPORTED_SOURCES[0];

const ProviderPage = async (props: ProviderPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const network =
    searchParams.network === "mainnet" ? searchParams.network : DEFAULT_SOURCE;
  const nameParam = params.name as string;

  const data = await getPublisher(nameParam, network);

  if (!data) {
    return notFound();
  }

  return (
    <div className={clsx("explorer-page explorer-detail", "mx-auto")}>
      <ScrollReveal direction="none">
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
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <PublisherHeader publisher={data} />
        </BoxContainer>
      </ScrollReveal>
      {data.pairs && (
        <ScrollReveal delay={0.2}>
          <BoxContainer>
            <PairReported components={data.pairs} />
          </BoxContainer>
        </ScrollReveal>
      )}
    </div>
  );
};

export default ProviderPage;
