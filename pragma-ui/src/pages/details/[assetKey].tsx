import React, { useMemo } from "react";
import { assetKeyToUrl, urlToAssetKey } from "../../../utils/encodeUrl";
import {
  AssetKeys,
  useOracleGetEntries,
  useOracleGetValue,
} from "../../hooks/oracle";
import SectionContainer from "../../components/common/SectionContainer";
import { DefaultCTASection } from "../../components/CTASection";
import EntriesTable from "../../components/Details/EntriesTable";
import DetailDisplay from "../../components/Details/DetailDisplay";
// import Banner from "../../components/Banner";

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
      {/* <Banner /> */}
      <SectionContainer className="bg-dark" first>
        <DetailDisplay
          assetKey={assetKey}
          oracleResponse={valueResponse}
          loading={valueLoading}
          error={valueError}
        />
      </SectionContainer>
      <SectionContainer className="relative bg-black">
        <EntriesTable
          assetKey={assetKey}
          decimals={decimals}
          oracleResponse={entriesResponse}
          loading={entriesLoading}
          error={entriesError}
        />
      </SectionContainer>
      <SectionContainer className="bg-black !pt-0">
        <DefaultCTASection />
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
