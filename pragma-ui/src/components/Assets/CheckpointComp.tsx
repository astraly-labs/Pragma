import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { truncateTxHash } from "../../utils";

const CheckpointComp = ({ component }) => {
  return (
    <div className={styles.priceComp}>
      <Link
        href={`https://voyager.online/tx/${component.hash}`}
        className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider"
      >
        {truncateTxHash(component.hash)}
        <Image
          height={16}
          width={16}
          alt="Link"
          src="/assets/vectors/outLink.svg"
        />
      </Link>
      <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"></div>
      <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"></div>
      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.price}
      </div>

      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.date}
      </div>
      <div className="flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.hour}
      </div>
      <Link
        className=" flex cursor-pointer flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider"
        href={`https://voyager.online/contract/${component.signer}`}
      >
        {truncateTxHash(component.signer)}
        <Image
          height={16}
          width={16}
          alt="Link"
          src="/assets/vectors/outLink.svg"
        />
      </Link>
    </div>
  );
};

export default CheckpointComp;
