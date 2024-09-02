import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Item } from "../../pages/optimistic";
import { findCurrencyNameByAddress, utcToLocalTime } from "../../utils";

interface AssessmentProps {
  assessment: Item;
  loading: boolean;
  key: any;
  onClick: any;
}
const Assessment: React.FC<AssessmentProps> = ({
  assessment,
  loading,
  key,
  onClick,
}) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  const { full } = utcToLocalTime(assessment.timestamp);

  useEffect(() => {
    const updateProgressAndTime = () => {
      const start = new Date(assessment.timestamp);
      const startTimestamp = Math.floor(start.getTime());
      const end = new Date(assessment.expiration_time);
      const endTimestamp = Math.floor(end.getTime());
      const now = Date.now();
      const total = endTimestamp - startTimestamp;
      const current = now - startTimestamp;
      const calculatedProgress = Math.min(
        Math.max((current / total) * 100, 0),
        100
      );
      setProgress(calculatedProgress);

      // Calculate time left
      const remaining = endTimestamp - now;
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
  }, [assessment]);

  return (
    <div className={styles.assessment}>
      <div
        className="min-w-96 my-auto flex cursor-pointer flex-row gap-4 text-LightGreenFooter hover:opacity-50 md:tracking-wider"
        onClick={onClick}
      >
        {loading ? (
          <div className="my-auto h-8 w-8 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <Image
            height={30}
            width={30}
            alt="AssetImage"
            src={
              assessment.image
                ? assessment.image
                : "/assets/vectors/optimist.svg"
            }
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
              {full}
            </div>
          </div>
        )}
      </div>

      <div className="my-auto flex translate-x-3 flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-24 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{assessment.identifier}</div>
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
              src={`/assets/currencies/${findCurrencyNameByAddress(
                assessment.currency
              ).toLowerCase()}.svg`}
            />
            <div>{Number(assessment.bond) / 1000000000000000000}</div>
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
                style={{
                  width: timeLeft === "Ended" ? "100%" : `${progress}%`,
                }}
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
