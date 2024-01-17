import React from "react";
import styles from "./styles.module.scss";
import GreenUpperText from "../common/GreenUpperText";

interface StatsProps {
  tve: string;
  tvs: string;
  className?: string;
}

const StatsBox: React.FC<StatsProps> = ({ tve, tvs, className, ...props }) => (
  <div className={styles.statsBox}>
    <h2 className="text-lightGreen">${tve}</h2>
    <GreenUpperText>TVE (Total value enabled)</GreenUpperText>
    <h2 className="text-lightGreen">${tvs}</h2>
    <GreenUpperText>TVS (Total value secured)</GreenUpperText>
  </div>
);

export default StatsBox;
