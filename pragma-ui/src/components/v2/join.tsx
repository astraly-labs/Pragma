import React from "react";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import Image from "next/image";
import styles from "./styles.module.scss";

const Join = () => {
  return (
    <div className="relative mt-20 h-[70vh] w-full overflow-hidden lg:h-[80vh]">
      <Image
        src={"/assets/vectors/vectorJoin.svg"}
        alt="Illustration Hero"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 block opacity-50"
      />
      <div className={classNames("flex h-full w-full")}>
        <div className={styles.gradJoin}></div>
        <header className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-8 px-4 text-center">
          <div className="text-sm uppercase text-mint">Get started</div>
          <h1 className="text-4xl font-semibold text-lightGreen md:whitespace-nowrap md:text-6xl">
            Join the community, contribute now
          </h1>
          <GreenText isAligned={true} className="text-lg md:text-xl">
            Join the Pragma community, become a Pragmagician, start contributing
            to the <span className=" text-purple">future of oracles</span>.
          </GreenText>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <ButtonLink
              center={true}
              color="mint"
              variant="solid"
              href={"https://t.me/+Xri-uUMpWXI3ZmRk"}
              className="w-fit"
            >
              Telegram
            </ButtonLink>
            <ButtonLink
              center={true}
              color="mint"
              variant="outline"
              href={"https://discord.gg/M9aRZtZHU7"}
              className="w-fit"
            >
              Discord
            </ButtonLink>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Join;
