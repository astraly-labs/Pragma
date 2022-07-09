import React from "react";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import CTASection from "../components/CTASection";
import SectionContainer from "../components/common/SectionContainer";
import Stats, { Stat } from "../components/Stats";
import Code from "../components/Code/Code";
<<<<<<< HEAD
import Heading from "../components/Heading";
=======
import Header from "../components/Header";
>>>>>>> ui-v1.0
import ProtocolSection from "../components/Protocol/ProtocolSection";

const stats: Stat[] = [
  {
    label: "Customers",
    value: "8",
  },
  {
    label: "Data providers",
    value: "14",
  },
  {
    label: "Data integrity members",
    value: "6",
  },
  {
    label: "Raised",
    value: "$7M",
  },
];

<<<<<<< HEAD
const ProtocolsPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50">
        <Heading
=======
const ProtocolPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50">
        <Header
>>>>>>> ui-v1.0
          title="StarkNet's leading protocols"
          subtitle="Meet our users"
          text="We work closely with teams to ensure they get exactly what they need. Reach out to us if you need a custom solution."
          href="#"
          hrefText="Get verifyable data for your project"
        />
        <Stats stats={stats} />
      </SectionContainer>
      <SectionContainer className="sm:!pt-0">
        <ProtocolSection />
      </SectionContainer>
      <SectionContainer className="bg-slate-50">
<<<<<<< HEAD
        <Heading
=======
        <Header
>>>>>>> ui-v1.0
          title="3 easy steps"
          subtitle="Try it yourself"
          text="We offer a variety of ways to interact with the oracle."
          href="#"
          hrefText="Read the documentation"
        />
        <Code />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <CTASection
          title="Ready to get the data you need?"
          description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
          mainAction={{
            href: "/",
            actionText: "Read the docs",
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

<<<<<<< HEAD
export default ProtocolsPage;
=======
export default ProtocolPage;
>>>>>>> ui-v1.0
