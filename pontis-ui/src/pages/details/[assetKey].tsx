import React from "react";
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

  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50">
        <DetailDisplay
          assetKey={assetKey}
          oracleResponse={valueResponse}
          loading={valueLoading}
          error={valueError}
        />
      </SectionContainer>
      <SectionContainer>
        <EntriesTable
          assetKey={assetKey}
          oracleResponse={entriesResponse}
          loading={entriesLoading}
          error={entriesError}
        />
      </SectionContainer>
      <SectionContainer>
        <CTASection
          title="Ready to get the data you need?"
          description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
          mainAction={{
            href: "/",
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
