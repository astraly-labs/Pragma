import React from "react";
import styles from "./Form.module.scss";
import classNames from "classnames";

const ThirdStep = ({ formData, handleFieldChange }) => {
  const getOracleContent = (type) => {
    switch (type) {
      case "api":
        return (
          <div>
            <h2 className={styles.title}>Choose data sources</h2>
            <p className="mb-4 max-w-xl text-justify text-sm text-gray-500">
              Please select the data sources you wish to include. We've included
              depth metrics, and will soon provide you with a full dashboard of
              information to make the best choice for your use case. If you need
              help to select the sources, please{" "}
              <a
                href="https://t.me/BGLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mint"
              >
                reach out to us.
              </a>{" "}
            </p>
            <ul className="grid w-full gap-6 md:grid-cols-1">
              {mockDataList.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    name="data-source"
                    value={item.source}
                    className="peer hidden"
                    onChange={() => handleCheckboxChange(item.pair)}
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className={classNames(
                      "flex w-full max-w-xl cursor-pointer flex-col justify-between rounded-lg border text-lightGreen",
                      "hover:bg-whiteTrans peer-checked:border-mint peer-checked:text-mint",
                      styles.darkGreenBox
                    )}
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row gap-2">
                        <img
                          src={`/assets/publishers/${item.logo}`}
                          alt={`${item.source} logo`}
                          className="my-auto h-8 w-8"
                        />
                        <div className="my-auto w-full text-lg font-bold">
                          {item.source}
                        </div>
                      </div>
                      <div className="w-full text-sm font-medium">
                        {item.pair} - Price:{" "}
                        <span className="font-semibold">{item.price}</span>
                      </div>
                      <div className="w-full text-sm">
                        <span className="font-semibold">+2% Depth:</span>{" "}
                        {item.depthPlus2Percent}
                      </div>
                      <div className="w-full text-sm">
                        <span className="font-semibold">-2% Depth:</span>{" "}
                        {item.depthMinus2Percent}
                      </div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
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
      pair: "TRUMP/USD",
      source: "OKX",
      logo: "okx.png",
      price: "$15.74",
      depthPlus2Percent: "$1,127,515",
      depthMinus2Percent: "$1,183,795",
    },
    {
      pair: "TRUMP/USD",
      source: "Binance",
      logo: "binance.webp",
      price: "15.68$",
      depthPlus2Percent: "$1,850,716",
      depthMinus2Percent: "$4,372,277",
    },
    {
      pair: "TRUMP/USD",
      source: "Jupiter",
      logo: "jup.png",
      price: "15.83$",
      depthPlus2Percent: "$4,490,004",
      depthMinus2Percent: "5,723,200$",
    },
    {
      pair: "TRUMP/USD",
      source: "Jupiter",
      logo: "jup.png",
      price: "1$",
      depthPlus2Percent: "10,000$",
      depthMinus2Percent: "100,000$",
    },
  ];

  console.log(mockDataList);

  const handleCheckboxChange = (pair) => {
    handleFieldChange({
      ...formData,
      selectedPairs: formData.selectedPairs.includes(pair)
        ? formData.selectedPairs.filter((p) => p !== pair)
        : [...formData.selectedPairs, pair],
    });
  };

  return (
    <div className={styles.container}>{getOracleContent(formData.type)}</div>
  );
};

export default ThirdStep;
