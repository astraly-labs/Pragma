import React, { useEffect, useState, useCallback } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import ActiveAssessments from "../components/optimistic/ActiveAssessments";
import StarknetProvider from "../components/Provider/StarknetProvider";
import {
  InjectedConnector,
  publicProvider,
  StarknetConfig,
} from "@starknet-react/core";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import {
  hexToUtf8,
  extractDescriptionFromClaim,
  extractTitleFromClaim,
} from "../utils";
import axios from "axios";

export interface Item {
  assertion_id: number;
  title: string;
  description;
  status: string;
  timestamp: string;
  bond: string;
  dispute_id: number;
  currency: string;
  expiration_time: string;
  image?: string;
  identifier: string;
}

const OptimisticPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [assertionType, setAssertionType] = useState<string>("active");
  const [page, setPage] = useState<number>(1);

  const INITIAL_LIMIT = 2;
  const LOAD_MORE_LIMIT = 2;

  const connectors = [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  const handleAssertionTypeChange = (newType: string) => {
    setAssertionType(newType.toLowerCase());
    setPage(1);
    fetchData(newType.toLowerCase(), 1);
  };

  const fetchData = useCallback(
    async (type: string, pageNumber: number, loadMore: boolean = false) => {
      try {
        setLoading(true);
        const limit = pageNumber === 1 ? INITIAL_LIMIT : LOAD_MORE_LIMIT;
        const API_URL = `${
          process.env.API_URL ||
          "http://0.0.0.0:3000/node/v1/optimistic/assertions"
        }?status=${type.toLowerCase()}&page=${pageNumber}&limit=${limit}`;
        const response = await axios.get(API_URL);
        const assertions = response.data.assertions;
        const newItems = assertions.map((assertion: any) => ({
          assertion_id: assertion.assertion_id,
          title: extractTitleFromClaim(hexToUtf8(assertion.claim)),
          description: extractDescriptionFromClaim(hexToUtf8(assertion.claim)),
          status: assertion.status,
          timestamp: assertion.timestamp,
          bond: assertion.bond,
          dispute_id: assertion.dispute_id,
          currency: assertion.currency,
          expiration_time: assertion.expiration_time,
          identifier: hexToUtf8(assertion.identifier),
        }));
        if (loadMore) {
          setItems((prevItems) => [...prevItems, ...newItems]);
        } else {
          setItems(newItems);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    },
    [INITIAL_LIMIT, LOAD_MORE_LIMIT]
  );
  useEffect(() => {
    if (page === 1) {
      fetchData(assertionType, 1, false);
    }
    const intervalId = setInterval(() => {
      if (page === 1) {
        fetchData(assertionType, 1, false);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [assertionType, fetchData, page]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(assertionType, nextPage, true);
  };

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
          <ActiveAssessments
            assessments={items}
            loading={loading}
            onAssertionTypeChange={handleAssertionTypeChange}
          />
        </BoxContainer>
      </div>
    </StarknetProvider>
  );
};

export default OptimisticPage;
