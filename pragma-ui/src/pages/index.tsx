import React, { useEffect, useState } from "react";
import Hero from "../components/Landing/Hero";
// import AssetsSection from "../components/Asset/AssetsSection";
// import { DefaultCTASection } from "../components/CTASection";
// import Code from "../components/Code/Code";
// import InfoSection from "../components/Info/InfoSection";
// // import Banner from "../components/Banner";
// import LogoCloud from "../components/LogoClouds/LogoCloud";
// import Stats from "../components/Stats";
// import { protocols } from "../components/Protocol/ProtocolSection";
// import LogoGrid from "../components/LogoClouds/LogoGrid";
// import { Logo } from "../components/LogoClouds/LogoCloud";
// import LogoGrid from "../components/LogoClouds/LogoGrid";
import styles from "./styles.module.scss";
import MarqueeLogo from "../components/Landing/MarqueeLogo";
import BoxContainer from "../components/common/BoxContainer";
import BlurBox from "../components/common/BlurBox";
import CodeSnippet from "../components/Landing/CodeSnippet";
import Architecture from "../components/Landing/Architecture";
import Testimonial from "../components/Landing/Testimonial/Testimonial";
import Blog from "../components/Landing/Blog/Blog";
import Events from "../components/Landing/Events";
import ReadyBox from "../components/common/ReadyBox";
import { ChartBox } from "../components/common/ChartBox";
import AssetBox, { AssetPair, AssetT } from "../components/common/AssetBox";
import classNames from "classnames";
// import Advisors from "../components/Landing/Advisors";

// const dataPublishers: Logo[] = [
//   {
//     name: "Skynet Trading",
//     src: "/assets/publishers/skynet.svg",
//     href: "https://www.skynettrading.com/",
//   },
//   {
//     name: "Flowdesk",
//     src: "/assets/publishers/flowdesk.webp",
//     href: "https://www.flowdesk.co/",
//   },
//   {
//     name: "Kaiko",
//     src: "/assets/publishers/kaiko.webp",
//     href: "https://www.kaiko.com/",
//   },
// ];

// const ecosystemPartners: Logo[] = [
//   {
//     name: "Consensys",
//     src: "/assets/ecosystem/consensys.webp",
//     href: "https://consensys.net/",
//   },
//   {
//     name: "Argent",
//     src: "/assets/ecosystem/argent.png",
//     href: "https://www.argent.xyz/",
//   },
//   {
//     name: "Equilibrium",
//     src: "/assets/ecosystem/equilibrium.png",
//     href: "https://equilibrium.co/",
//   },
//   {
//     name: "Braavos",
//     src: "/assets/ecosystem/braavos.webp",
//     href: "https://braavos.app/",
//   },
// ];

const initialAssets: AssetT[] = [
  { ticker: 'BTC/USD', address: '0x0' },
  { ticker: 'ETH/USD', address: '0x1' },
];

const IndexPage = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetPair>({
    ticker: "BTC/USD",
    lastPrice: 50000,
    variation24h: 2000,
    relativeVariation24h: 4,
    priceData: [
      { time: "2018-12-22", value: 32.51 },
      { time: "2018-12-23", value: 31.11 },
      // Add more data as needed
    ],
  });

  const [allData, setAllData] = useState<AssetPair[]>([]); // Initialize state with empty array

  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>({
    ticker: "BTC/USD",
    address: "0x0",
  });

  // Function to handle asset selection
  const handleAssetSelect = (assetPair: AssetT) => {
    setSelectedAssetPair(assetPair); // Update selected asset in state
  };

  useEffect(() => {
    const fetchData = async (pairId: string) => {
      try {
        // This URL is now pointing to your Next.js API route (the proxy)
        const url = `/api/proxy?pair=${pairId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        // Update your state with the new data
        let asset_data = {
          ticker: data.pair_id,
          lastPrice: data.data[0].close,
          variation24h: 2000,
          relativeVariation24h: 4,
          priceData: data.data.reverse().map((d) => ({
            time: new Date(d.time).getTime() / 1000,
            value: parseInt(d.close) / 10 ** 8,
          })),
        };
        setAllData((data) => [...data, asset_data]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    for (let i = 0; i < initialAssets.length; i++) {
      const asset = initialAssets[i];
      fetchData(asset.ticker);
    }

  }, []); // Dependency array is empty to run once on mount

  useEffect(() => {
    // Update data when selected asset changes
    if (allData.length > 0) {
      let new_asset = allData.find((asset) => asset.ticker === selectedAssetPair.ticker);
      setSelectedAsset(new_asset);
    }
  }, [allData, selectedAssetPair]);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean-up function to remove event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Define different image sources based on screen size
  const getImageSource1 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector1bis.svg";
    } else {
      return "/assets/vectors/vector1.svg";
    }
  };

  const getImageSource2 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector2bis.svg";
    } else {
      return "/assets/vectors/vector2.svg";
    }
  };

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      {/* <Banner /> */}
      <Hero />
      <MarqueeLogo />
      <BoxContainer>
        <BlurBox
          firstText="Price Feeds"
          title="The data your smart-contracts always wanted."
          generalText="Your smart contracts are decentralized, transparent and composable. The data you’re using to feed them should have the same properties. Start integrating Pragma’s price feed now and unlock the power of verifiable data."
          urlSvg={getImageSource1()}
          textButton="Integrate Now"
        />
        <div className="flex h-full w-full flex-col gap-3 sm:gap-8">
          <ChartBox assetPair={selectedAsset} />
          <AssetBox assets={initialAssets} onAssetSelect={handleAssetSelect} />
        </div>
      </BoxContainer>
      <BoxContainer>
        <CodeSnippet />
        <BlurBox
          firstText="Start Building"
          title="Integrate existing feeds, or build new ones."
          generalText="A few lines to integrate any existing data feed, a few more if you want to create a new feed using our raw data."
          urlSvg={getImageSource2()}
          textButton="Start Building"
        />
      </BoxContainer>
      <BoxContainer>
        <Architecture />
      </BoxContainer>
      <BoxContainer>
        <Testimonial />
      </BoxContainer>
      <Blog />
      <BoxContainer>
        <Events />
      </BoxContainer>
      <BoxContainer>
        <ReadyBox version={true} />
      </BoxContainer>
    </div>
  );
};

export default IndexPage;
