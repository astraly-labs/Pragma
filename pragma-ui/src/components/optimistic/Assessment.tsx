import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const Assessment = ({ assessment, loading }) => {
  return (
    <div className={styles.assessment}>
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        {loading ? (
          <div className="my-auto  h-8 w-8 animate-pulse rounded-full bg-lightBlur"></div>
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
              {assessment.startDispute}
            </div>
          </div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider"></div>
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider"></div>

      <div className="my-auto flex translate-x-3 flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider">
        {loading ? (
          <div className=" my-auto h-3 w-24 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{assessment.output}</div>
        )}
      </div>
      <div className="my-auto flex translate-x-2 flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{assessment.bond}</div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-20 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <>{assessment.endDispute}</>
        )}
      </div>
    </div>
  );
};

export default Assessment;
