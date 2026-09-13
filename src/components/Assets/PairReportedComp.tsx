import React from "react";
import styles from "./styles.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PairReportedComp = ({ component }) => {
  return (
    <div className={styles.pairComp}>
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        <Avatar className="h-8 w-8">
          <AvatarImage alt="" src={component.image} />
          <AvatarFallback>{component.ticker[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-lg text-lightGreen">
          {component.ticker}
          <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
            {component.type}
          </div>
        </div>
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.source}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.lastUpdated}
      </div>

      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.price}
      </div>
      <div className=" my-auto flex cursor-pointer flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.dailyUpdates}
      </div>
    </div>
  );
};

export default PairReportedComp;
