"use client";

import styles from "./styles.module.scss";
import GreenText from "@/components/common/GreenText";
import GreenUpperText from "@/components/common/GreenUpperText";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Architecture = () => (
  <div className={cn("align-center w-full", styles.darkGreenBox)}>
    <GreenUpperText className="mx-auto pb-3">Our Architecture</GreenUpperText>
    <h2 className="mx-auto pb-6 text-lightGreen">The first provable oracle</h2>
    <GreenText isAligned={true} className="mx-auto max-w-3xl pb-10">
      Pragma utilizes STARK proofs to ensure data correctness. Explore how we
      achieve this while maintaining a 200ms latency in running the oracle,
      enabling composability and programmability.
    </GreenText>
    <div className="m-auto w-full md:w-10/12">
      <Image
        src="/assets/vectors/Nodes.svg"
        alt="Pragma Architecture"
        width={1200}
        height={600}
        className="h-auto w-full"
      />
    </div>
  </div>
);

export default Architecture;
