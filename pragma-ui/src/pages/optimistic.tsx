import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import ActiveAssessments from "../components/optimistic/ActiveAssessments";

const OptimisticPage = () => {
  const assessments = Array(5).fill({
    image: `/assets/currencies/skynet_trading.svg`,
    title: "Is Biden the winner of the US election?",
    timestamp: "2sAGO",
    output: "1000",
    bond: "10",
    startDispute: "60min",
    endDispute: `70min`,
  });
  return (
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
        solidButtonLink={"/assertion"}
        outlineButton={"Integrate"}
        outlineButtonLink={
          "https://docs.pragma.build/Resources/Cairo%201/optimistic-oracle/Overview"
        }
        illustrationLink={"/assets/vectors/ecosystem.svg"}
        illustrationSmallLink={"/assets/vectors/ecosystem.svg"}
      />
      <BoxContainer>
        <ActiveAssessments assessments={assessments} loading={true} />
      </BoxContainer>
    </div>
  );
};

export default OptimisticPage;
