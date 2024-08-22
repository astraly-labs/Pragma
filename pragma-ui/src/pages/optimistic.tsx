import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import ActiveAssessments from "../components/optimistic/ActiveAssessments";
import StarknetProvider from "../components/Provider/StarknetProvider";
import { InjectedConnector, publicProvider, StarknetConfig } from '@starknet-react/core';
import { WebWalletConnector } from 'starknetkit/webwallet';
import { ArgentMobileConnector } from 'starknetkit/argentMobile';

const OptimisticPage = () => {

  const connectors = [
    new InjectedConnector({ options: {id: "braavos", name: "Braavos" }}),
    new InjectedConnector({ options: {id: "argentX", name: "Argent X" }}), 
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
]

  const assessments = Array(5).fill({
    image: `/assets/vectors/optimist.svg`,
    title: "Is Biden the winner of the US election?",
    description: `This market refers to anything said in person on the main stage of the United Center on the second night of the DNC. Programming is currently scheduled to begin at 5:30 PM CT and end at 10:15 PM CT (see: https://demconvention.com/schedule/).

This market will resolve to "Yes" if "Trump" is between 50 (inclusive) and 74 (inclusive) times on the second night of the DNC. Otherwise, the market will resolve to "No".

Any live mention on stage which is audible on the stream of the event will count toward this market. Ads won't count - only in-person mentions count. Pluralization/possessive of "Trump" will count toward the resolution of this market, however other forms will NOT count. Note for example if "Donald is running for President" is said, it doesn't count as a mention - only "Trump" counts.

Compound words will count as long as "Trump" is part of the compound word and references the meaning which refers to the person Donald Trump.

The resolution source will be the video of the second night of the DNC., res_data: p1: 0, p2: 1, p3: 0.5. Where p1 corresponds to No, p2 to Yes, p3 to unknown. This request MUST only resolve to p1 or p2. Updates made by the question creator via the bulletin board at 0x2F5e3684cb1F318ec51b00Edba38d79Ac2c0aA9d should be considered.,initializer:91430cad2d3975766499717fa0d66a78d814e5c5`,
    timestamp: "2sAGO",
    output: "TRUE",
    bond: "100",
    bondCurrency: "usdc",
    startDispute: "1724046160",
    endDispute: `1724478160`,
  });
  return (
    <StarknetProvider connectors={connectors}>

    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <BasicHero
        title={"Propose, ask"}
        greenTitle={"dispute"}
        description={
          "The Pragma Optimistic Oracle is built for you. Ask any question, get the answer onchain."
        }
        solidButton={"Make an assertion"}
        solidButtonLink={"/request"}
        outlineButton={"Integrate"}
        outlineButtonLink={
          "https://docs.pragma.build/Resources/Cairo%201/optimistic-oracle/Overview"
        }
        illustrationLink={"/assets/vectors/ecosystem.svg"}
        illustrationSmallLink={"/assets/vectors/ecosystem.svg"}
      />
      <BoxContainer>
        <ActiveAssessments assessments={assessments} loading={false} />
      </BoxContainer>
    </div>
    </StarknetProvider>
  );
};

export default OptimisticPage;
