import React, { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import classNames from "classnames";

const ThirdStep = ({ formData, handleFieldChange }) => {
  const [pollingStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Initialize selectedPairs if not already set
    if (!formData.selectedPairs) {
      handleFieldChange('selectedPairs', []);
    }

    // When sources are available, select all of them by default if no selections have been made yet
    if (formData.sources?.length > 0 && (!formData.selectedPairs || formData.selectedPairs.length === 0)) {
      const allSourceNames = formData.sources.map(sourceData => sourceData.source.name);
      handleFieldChange('selectedPairs', allSourceNames);
    }

    // Update time elapsed every second
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - pollingStartTime) / 1000);
      if (elapsed <= 10) { // Only update for the first 10 seconds
        setTimeElapsed(elapsed);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Log whenever sources change
  useEffect(() => {
    console.log("[Debug] Sources updated:", formData.sources?.length, "sources");
  }, [formData.sources]);

  const getOracleContent = (type) => {
    switch (type) {
      case "api":
        return (
          <div>
            <h2 className={styles.title}>Choose data sources</h2>
            <p className="mb-4 max-w-xl text-justify text-sm text-gray-500">
              Please select the data sources you wish to include. These are the available sources for your token. If you need
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
            {formData.sources && Array.isArray(formData.sources) && formData.sources.length > 0 ? (
              <>
                <div className="mb-4 flex max-w-xl items-center gap-4">
                  <div className="text-sm text-mint">
                    Found {formData.sources.length} source{formData.sources.length > 1 ? 's' : ''}
                  </div>
                  {timeElapsed < 10 && (
                    <>
                      <div className="h-1 flex-1 rounded-full bg-darkGreen">
                        <div 
                          className="h-1 rounded-full bg-mint transition-all duration-200" 
                          style={{ width: `${(timeElapsed / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {10 - timeElapsed}s
                      </div>
                    </>
                  )}
                </div>
                <ul className="grid w-full gap-6 md:grid-cols-1">
                  {formData.sources.map((sourceData, index) => {
                    // Make sure we have a valid source object
                    if (!sourceData?.source?.name) {
                      console.log("Invalid source data:", sourceData);
                      return null;
                    }

                    const { source } = sourceData;

                    return (
                      <li key={source.id} className="animate-fadeIn">
                        <div
                          className={classNames(
                            "flex w-full max-w-xl flex-col justify-between rounded-lg border text-lightGreen",
                            styles.darkGreenBox,
                            sourceData.is_active && "border-mint bg-whiteTrans"
                          )}
                        >
                          <div className="flex flex-col space-y-2 p-4">
                            <div className="flex flex-row gap-2">
                              <div className="my-auto flex h-8 w-8 items-center justify-center rounded-full bg-darkGreen text-mint">
                                {source.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="my-auto w-full text-lg font-bold">
                                {source.name.charAt(0).toUpperCase() + source.name.slice(1)}
                              </div>
                            </div>
                            <div className="w-full text-sm">
                              {source.url && (
                                <a 
                                  href={source.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-mint hover:text-mint-dark"
                                >
                                  Visit Exchange
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <div className="max-w-xl rounded-lg border border-mint/20 bg-darkGreen/50 p-4 text-center">
                {timeElapsed < 10 ? (
                  <>
                    <div className="mb-3 text-lightGreen">Searching for available sources...</div>
                    <div className="flex items-center gap-4">
                      <div className="h-1 flex-1 rounded-full bg-darkGreen">
                        <div 
                          className="h-1 rounded-full bg-mint transition-all duration-200" 
                          style={{ width: `${(timeElapsed / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {10 - timeElapsed}s
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">
                    No sources found for this token yet. Please try again later or contact support.
                  </div>
                )}
              </div>
            )}
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

  return (
    <div className={styles.container}>{getOracleContent(formData.type)}</div>
  );
};

export default ThirdStep;
