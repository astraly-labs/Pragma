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
import AssetBox from "../components/common/AssetBox";
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

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

const assets = [
  {
    pair: "BTC/USD",
    lastPrice: 45000,
    var24h: 1200,
    var24hPercent: 2.7,
  },
  {
    pair: "ETH/USD",
    lastPrice: 3500,
    var24h: -200,
    var24hPercent: -4.2,
  },
  {
    pair: "ETH/USD",
    lastPrice: 3500,
    var24h: -200,
    var24hPercent: -4.2,
  },
  {
    pair: "ETH/USD",
    lastPrice: 3500,
    var24h: -200,
    var24hPercent: -4.2,
  },
  {
    pair: "ETH/USD",
    lastPrice: 3500,
    var24h: -200,
    var24hPercent: -4.2,
  },
];

const IndexPage = () => {
  const [windowWidth, setWindowWidth] = useState(null);

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
    <div className="w-full overflow-x-hidden">
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
          <ChartBox data={initialData} pairid={"ETH / USD"} />
          <AssetBox assets={assets} />
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
        <ReadyBox />
      </BoxContainer>
    </div>
  );
};

export default IndexPage;
