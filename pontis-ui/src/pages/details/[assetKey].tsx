import React, { useMemo } from "react";
import { CodeIcon, ChatIcon } from "@heroicons/react/outline";
import { assetKeyToUrl, urlToAssetKey } from "../../../utils/encodeUrl";
import {
  AssetKeys,
  useOracleGetEntries,
  useOracleGetValue,
} from "../../hooks/oracle";
import SectionContainer from "../../components/common/SectionContainer";
import CTASection from "../../components/CTASection";
import EntriesTable from "../../components/Details/EntriesTable";
import DetailDisplay from "../../components/Details/DetailDisplay";

const Details = ({ assetKey }) => {
  const {
    oracleResponse: valueResponse,
    loading: valueLoading,
    error: valueError,
  } = useOracleGetValue(assetKey);
  const {
    oracleResponse: entriesResponse,
    loading: entriesLoading,
    error: entriesError,
  } = useOracleGetEntries(assetKey);

  const decimals = useMemo(() => {
    return valueLoading || !valueResponse?.decimals || valueError
      ? 1
      : valueResponse.decimals;
  }, [valueResponse, valueLoading, valueError]);

  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50 pt-12">
        <DetailDisplay
          assetKey={assetKey}
          oracleResponse={valueResponse}
          loading={valueLoading}
          error={valueError}
        />
      </SectionContainer>
      <SectionContainer className="relative">
        {/* <div className="absolute inset-y-0 top-0 -translate-y-6">
          <SearchBar />
        </div> */}
        <EntriesTable
          assetKey={assetKey}
          decimals={decimals}
          oracleResponse={entriesResponse}
          loading={entriesLoading}
          error={entriesError}
        />
      </SectionContainer>
      <SectionContainer className="!pt-0">
        <CTASection
          title="Ready to get the data you need?"
          description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
          mainAction={{
            href: "https://docs.empiric.network/",
            actionText: "Get started",
            icon: CodeIcon,
          }}
          secondaryAction={{
            href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
            actionText: "Request asset",
            icon: ChatIcon,
          }}
        />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const { assetKey } = params;
  const url = urlToAssetKey(assetKey);
  return {
    props: { assetKey: url },
  };
};

export const getStaticPaths = async () => {
  const encodedAssets = AssetKeys.map((assetKey) => assetKeyToUrl(assetKey));
  const paths = encodedAssets.map((assetKey) => ({ params: { assetKey } }));
  return {
    paths,
    fallback: false,
  };
};

export default Details;
