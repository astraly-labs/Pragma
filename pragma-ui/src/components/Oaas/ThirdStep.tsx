import React from "react";
import cx from "classnames";
import { Input } from "reactstrap";
import styles from "./Form.module.scss";

const ThirdStep = ({ validationError, formData, handleFieldChange }) => {
  const getOracleContent = (type) => {
    switch (type) {
      case "api":
        return <h2 className={styles.title}>Sources</h2>;
      case "centralized":
        return (
          <div className={styles.centralizedContent}>
            <h2 className={styles.title}>Sources</h2>
          </div>
        );
      case "decentralized":
        return (
          <div className={styles.decentralizedContent}>
            <h3>Decentralized Selected</h3>
            <p>Details about the Decentralized oracle...</p>
          </div>
        );
      case "zk-proven":
        return (
          <div className={styles.zkProvenContent}>
            <h3>zk-proven Selected</h3>
            <p>Details about the zk-proven oracle...</p>
          </div>
        );
      default:
        return (
          <div className={styles.noSelection}>
            <h3>No Oracle Selected</h3>
            <p>Please select an oracle type to see more details.</p>
          </div>
        );
    }
  };

  const mockDataList = [
    {
      pair: "ETH/USD",
      source: "Jupiter",
      logo: "jup.png",
      price: "1$",
      depth2Percent: "10,000$",
      depth10Percent: "100,000$",
    },
    {
      pair: "BTC/USD",
      source: "Saturn",
      logo: "saturn.svg",
      price: "50,000$",
      depth2Percent: "500,000$",
      depth10Percent: "5,000,000$",
    },
    {
      pair: "LTC/USD",
      source: "Mars",
      logo: "mars.svg",
      price: "200$",
      depth2Percent: "20,000$",
      depth10Percent: "200,000$",
    },
    {
      pair: "XRP/USD",
      source: "Venus",
      logo: "venus.svg",
      price: "0.5$",
      depth2Percent: "5,000$",
      depth10Percent: "50,000$",
    },
    {
      pair: "ADA/USD",
      source: "Mercury",
      logo: "mercury.svg",
      price: "1.2$",
      depth2Percent: "12,000$",
      depth10Percent: "120,000$",
    },
  ];

  console.log(mockDataList);

  return (
    <div className={styles.container}>
      <h3 className="mb-5 text-lg font-medium text-lightGreen">
        Choose data sources:
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-1">
        {mockDataList.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`option-${index}`}
              name="data-source"
              value={item.source}
              className="peer hidden"
            />
            <label
              htmlFor={`option-${index}`}
              className="flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-lightGreen p-5 text-lightGreen hover:bg-whiteTrans peer-checked:border-mint peer-checked:text-mint"
            >
              <div className="flex flex-col">
                <img
                  src={`/assets/publishers/${item.logo}`}
                  alt={`${item.source} logo`}
                  className="mb-2 h-7 w-7"
                />
                <div className="w-full text-lg font-semibold">
                  {item.source}
                </div>
                <div className="w-full text-sm">
                  {item.pair} - Price: {item.price}
                </div>
                <div className="w-full text-sm">
                  2% Depth: {item.depth2Percent}, 10% Depth:{" "}
                  {item.depth10Percent}
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThirdStep;
