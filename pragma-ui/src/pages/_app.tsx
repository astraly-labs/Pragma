import React from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

import "../styles/index.css";
import { StarknetConfig, voyager, jsonRpcProvider } from "@starknet-react/core";
import Head from "next/head";
import NavHeader from "../components/Navigation/NavHeader";
import { sepolia, Chain } from "@starknet-react/chains";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { DataProvider } from "../providers/data";
import { GetServerSideProps } from "next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Dynamically import components with heavy computations or less critical UI elements
const DynamicNavFooter = dynamic(
  () => import("../components/Navigation/NavFooter"),
  { ssr: false }
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { initialData, initialPublishers, initialCheckpoints } = pageProps;
  const router = useRouter();

  // Define a custom background for a specific route
  const isSpecialPage = router.pathname === "/v2"; // Replace with your specific page path
  const backgroundColor = isSpecialPage ? "bg-black" : "bg-darkGreen";

  /**
   * Generates RPC configuration for the specified chain.
   * @param {Chain} chain - The blockchain chain for which to generate RPC configuration.
   * @return {object} An object containing RPC configuration for the specified chain.
   */
  function rpc(chain: Chain) {
    return {
      nodeUrl: `https://starknet-sepolia.public.blastapi.io/rpc/v0_6`,
    };
  }

  const provider = jsonRpcProvider({ rpc });
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta charSet="UTF-8" key="charset" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
            key="viewport"
          />
          <link rel="icon" type="image/ico" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#B5F0E5" />
        </Head>
        <Analytics />
        <SpeedInsights />
        <DefaultSeo
          titleTemplate="%s - Pragma - The network of zk-truth machines"
          defaultTitle="Pragma - The network of zk-truth machines"
          description="Pragma is the first network of zk-truth machines. Pragma provides data feeds for decentralized applications. Oracles are dead, long live truth machines."
          canonical="https://www.pragma.build"
          openGraph={{
            url: "https://www.pragma.build",
            title: "Pragma - The network of zk-truth machines",
            description:
              "Pragma is the first network of zk-truth machines. Pragma provides data feeds for decentralized applications. Oracles are dead, long live truth machines.",
            images: [
              {
                url: "https://www.pragma.build/pragma-og-img.png",
                width: 1200,
                height: 630,
                alt: "Pragma",
                type: "image/png",
              },
            ],
            site_name: "Pragma",
          }}
          twitter={{
            site: "@pragmaoracle",
            cardType: "summary_large_image",
          }}
        />
        <StarknetConfig
          chains={[sepolia]}
          provider={provider}
          explorer={voyager}
        >
          <div
            className={`text-sans flex min-h-screen flex-col items-center justify-start ${backgroundColor}`}
          >
            <NavHeader />
            <DataProvider
              initialData={initialData}
              initialPublishers={initialPublishers}
              initialCheckpoints={initialCheckpoints}
            >
              <Component {...pageProps} key={router.asPath} />
            </DataProvider>
            <DynamicNavFooter />
          </div>
        </StarknetConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const source = "mainnet"; // Default source, you can change this based on some logic
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/fetchData?source=${source}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const { results, publishersData, checkpointsData } = await response.json();

    return {
      props: {
        initialData: results,
        initialPublishers: publishersData,
        initialCheckpoints: checkpointsData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialData: {},
        initialPublishers: {},
        initialCheckpoints: {},
      },
    };
  }
};
export default React.memo(MyApp);
