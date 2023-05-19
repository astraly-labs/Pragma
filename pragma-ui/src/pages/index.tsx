import React from "react";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import Hero from "../components/Landing/Hero";
import AssetsSection from "../components/Asset/AssetsSection";
import Testimonial from "../components/Landing/Testimonial";
import { DefaultCTASection } from "../components/CTASection";
import Code from "../components/Code/Code";
import InfoSection from "../components/Info/InfoSection";
import Banner from "../components/Banner";
import LogoCloud from "../components/LogoClouds/LogoCloud";
import Stats from "../components/Stats";
import { protocols } from "../components/Protocol/ProtocolSection";
// import LogoGrid from "../components/LogoClouds/LogoGrid";
import { Logo } from "../components/LogoClouds/LogoCloud";
import LogoGrid from "../components/LogoClouds/LogoGrid";
// import Advisors from "../components/Landing/Advisors";

const stats = [
  {
    label: "Updates per 24h",
    value: "50k+",
  },
  {
    label: "Data sources",
    value: "12+",
  },
  {
    label: "Data feeds",
    value: "20+",
  },
  // {
  //   label: "Seed round",
  //   value: "$7M",
  // },
];

const dataPublishers: Logo[] = [
  {
    name: "Skynet Trading",
    src: "/assets/publishers/skynet.svg",
    href: "https://www.skynettrading.com/",
  },
  {
    name: "Flowdesk",
    src: "/assets/publishers/flowdesk.webp",
    href: "https://www.flowdesk.co/",
  },
];

const ecosystemPartners: Logo[] = [
  {
    name: "Consensys",
    src: "/assets/ecosystem/consensys.webp",
    href: "https://consensys.net/",
  },
  {
    name: "Argent",
    src: "/assets/ecosystem/argent.png",
    href: "https://www.argent.xyz/",
  },
  {
    name: "Equilibrium",
    src: "/assets/ecosystem/equilibrium.png",
    href: "https://equilibrium.co/",
  },
  {
    name: "Braavos",
    src: "/assets/ecosystem/braavos.webp",
    href: "https://braavos.app/",
  },
];

const supportedTestnetNetworks: Logo[] = [
  {
    name: "Starknet Testnet",
    src: "/assets/angels/starknet.svg",
    href: "https://starkware.co/starknet/",
  },
  {
    name: "Consensys Testnet",
    src: "/assets/ecosystem/consensys.webp",
    href: "https://consensys.net/",
  },
  {
    name: "Zk Sync Testnet",
    src: "/assets/ecosystem/zksync.svg",
    href: "https://zksync.io/",
  },
];

const IndexPage = () => (
  <div className="w-screen">
    <Banner />
    <SectionContainer className="bg-dark" first>
      <Hero />
    </SectionContainer>
    <SectionContainer className="bg-dark">
      <LogoGrid
        title="Proprietary data from custom integrations with"
        logos={dataPublishers}
      />
    </SectionContainer>
    <SectionContainer className="bg-black !pt-0">
      <AssetsSection />
      <LogoCloud title="Trusted by" logos={protocols} />
    </SectionContainer>
    <SectionContainer className=" !pt-30 bg-dark">
      <LogoCloud title="Supported Networks" logos={supportedTestnetNetworks} />
    </SectionContainer>
    <SectionContainer className="bg-dark">
      <Heading
        title="A few simple lines to integrate"
        subtitle="Try it yourself"
        text="Ready to get going? Head to our documentation using the link below and start using high-quality data in your smart contracts!
        Or, copy the code below to install the Pragma SDK and start interacting with our feeds locally."
        href="https://docs.pragmaoracle.com/quickstart"
        hrefText="Start using robust data on-chain"
      />
      <Code />
    </SectionContainer>
    <SectionContainer className="bg-black">
      <Testimonial />
      <Stats stats={stats} />
      {/* <Advisors /> */}
    </SectionContainer>
    <SectionContainer className="overflow-hidden bg-dark">
      <Heading
        title="Reimagine Oracles"
        subtitle="Why Pragma?"
        text="Built zk-first from the ground up, we power the DeFi ecosystem, from exchanges to stablecoins to money markets."
        href="/features"
        hrefText="Learn more about how Pragma works"
      />
      <InfoSection />
    </SectionContainer>
    <SectionContainer className=" bg-black">
      <LogoCloud title="Ecosystem Partners" logos={ecosystemPartners} />
      <DefaultCTASection />
    </SectionContainer>
  </div>
);

export default IndexPage;
