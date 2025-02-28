import React, { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import classNames from "classnames";
import axios from "axios";

const ThirdStep = ({ formData, handleFieldChange }) => {
  const [pollingStartTime, setPollingStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const POLLING_DURATION = 30; // 30 seconds polling duration

  const restartPolling = () => {
    // Reset sources to trigger UI refresh
    handleFieldChange('sources', []);
    // Reset time elapsed
    setTimeElapsed(0);
    // Reset polling start time
    setPollingStartTime(Date.now());
    // Start polling again
    pollForSources(formData.ticker.toUpperCase());
  };

  const pollForSources = async (ticker: string) => {
    const maxAttempts = POLLING_DURATION; // 30 seconds
    const interval = 1000; // 1 second
    const token = localStorage.getItem("apiToken");
    let allSources = [];

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        console.log(`Polling attempt ${attempt + 1} of ${maxAttempts}`);
        
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TOKEN_API_URL || 'http://localhost:8002'}/v1/sources/${ticker}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data && Array.isArray(response.data.sources)) {
          // Update allSources with any new sources
          const newSources = response.data.sources;
          
          // Add any new sources that aren't already in allSources
          newSources.forEach(newSource => {
            if (!allSources.some(existing => 
              existing.source?.id === newSource.source?.id
            )) {
              allSources.push(newSource);
            }
          });

          // Update form data with all sources found so far
          handleFieldChange('sources', allSources);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }

      // Wait for the interval before next attempt
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  };

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
      if (elapsed <= POLLING_DURATION) { // Only update for the first 30 seconds
        setTimeElapsed(elapsed);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [pollingStartTime]);

  // Log whenever sources change
  useEffect(() => {
    console.log("[Debug] Sources updated:", formData.sources?.length, "sources");
  }, [formData.sources]);

  const getOracleContent = (type) => {
    switch (type) {
      case "api":
        return (
          <div>
            <div className="flex items-center justify-between">
              <h2 className={styles.title}>Choose data sources</h2>
              <button
                onClick={restartPolling}
                className="flex items-center gap-2 rounded-full border border-mint px-4 py-2 text-sm text-mint hover:bg-mint hover:text-darkGreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Refresh Sources
              </button>
            </div>
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
                  {timeElapsed < POLLING_DURATION && (
                    <>
                      <div className="h-1 flex-1 rounded-full bg-darkGreen">
                        <div 
                          className="h-1 rounded-full bg-mint transition-all duration-200" 
                          style={{ width: `${(timeElapsed / POLLING_DURATION) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {POLLING_DURATION - timeElapsed}s
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
                {timeElapsed < POLLING_DURATION ? (
                  <>
                    <div className="mb-3 text-lightGreen">Searching for available sources...</div>
                    <div className="flex items-center gap-4">
                      <div className="h-1 flex-1 rounded-full bg-darkGreen">
                        <div 
                          className="h-1 rounded-full bg-mint transition-all duration-200" 
                          style={{ width: `${(timeElapsed / POLLING_DURATION) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {POLLING_DURATION - timeElapsed}s
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
