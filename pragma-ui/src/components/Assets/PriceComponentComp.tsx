import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { truncateTxHash } from "../../utils";

const PriceComponentComp = ({ component }) => {
  return (
    <div className={styles.priceComp}>
      <Link
        href={`/provider/${component.publisher}`}
        className="flex cursor-pointer flex-row gap-2 	 font-mono text-sm text-lightGreen md:tracking-wider"
      >
        {component.publisher}
        <Image
          height={16}
          width={16}
          alt="Link"
          src="/assets/vectors/outLink.svg"
        />
      </Link>
      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.source}
      </div>

      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.price}
      </div>
      <Link
        className=" flex cursor-pointer flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider"
        href={`https://voyager.online/tx/${component.hash}`}
      >
        {truncateTxHash(component.hash)}
        <Image
          height={16}
          width={16}
          alt="Link"
          src="/assets/vectors/outLink.svg"
        />
      </Link>

      <div className="flex flex-row gap-2 overflow-auto font-mono text-sm text-lightGreen md:tracking-wider">
        {component.lastUpdated}
      </div>
      <div className="flex flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider"></div>
    </div>
  );
};

export default PriceComponentComp;
