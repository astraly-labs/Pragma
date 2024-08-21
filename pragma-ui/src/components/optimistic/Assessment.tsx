import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Assessment = ({ assessment, loading }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!loading) {
      const updateProgressAndTime = () => {
        const start = assessment.startDispute * 1000; // Convert to milliseconds
        const end = assessment.endDispute * 1000; // Convert to milliseconds
        const now = Date.now();
        const total = end - start;
        const current = now - start;
        const calculatedProgress = Math.min(
          Math.max((current / total) * 100, 0),
          100
        );
        setProgress(calculatedProgress);

        // Calculate time left
        const remaining = end - now;
        if (remaining > 0) {
          const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (remaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft("Ended");
        }
      };

      updateProgressAndTime();
      const timer = setInterval(updateProgressAndTime, 1000); // Update every second

      return () => clearInterval(timer);
    }
  }, [assessment, loading]);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className={styles.assessment}>
      <div className="min-w-96 my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        {loading ? (
          <div className="my-auto h-8 w-8 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <Image
            height={30}
            width={30}
            alt="AssetImage"
            src={assessment.image}
          />
        )}
        {loading ? (
          <div className="flex flex-col text-lg text-lightGreen">
            <div className="my-auto mb-1 h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>{" "}
            <div className="my-auto h-2 w-8 animate-pulse rounded-full bg-lightBlur"></div>
          </div>
        ) : (
          <div className="text-md flex flex-col text-lightGreen">
            {assessment.title}
            <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
              {formatDate(assessment.startDispute)}
            </div>
          </div>
        )}
      </div>

      <div className="my-auto flex translate-x-3 flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-24 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{assessment.output}</div>
        )}
      </div>
      <div className="my-auto flex translate-x-2 flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <>
            <Image
              alt="Bond Currency"
              width={17}
              height={17}
              src={`/assets/currencies/${assessment.bondCurrency}.svg`}
            />
            <div>{assessment.bond}</div>
          </>
        )}
      </div>
      <div className="my-auto flex flex-col gap-1 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-20 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <>
            <div className="h-1 w-40 rounded-full bg-lightBlur">
              <div
                className="h-1 rounded-full bg-mint transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-center text-xs">Left: {timeLeft}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Assessment;
