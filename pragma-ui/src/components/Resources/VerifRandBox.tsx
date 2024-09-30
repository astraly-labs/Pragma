import React from "react";
import styles from "./styles.module.scss";
import { ButtonLink } from "../common/Button";
import GreenText from "../common/GreenText";
import Image from "next/image";

const VerifRandBox = () => {
  return (
    <div className={styles.darkGreenBoxBis}>
      <div className="my-auto w-full items-center lg:w-10/12">
        <h2 className="mb-4 text-center text-lightGreen lg:text-left">
          Verifiable random function
        </h2>
        <GreenText
          isAligned={false}
          className="mb-10 text-center  lg:text-left"
        >
          Pragma offers a verifiable randomness feed that allows protocols to
          request secure randomness on-chain. The randomness proof is posted as
          calldata, and enables games, betting platforms or any other app to
          leverage verifiable randomness securely.
        </GreenText>
        <ButtonLink
          variant="outline"
          color="mint"
          href="https://docs.pragma.build/Resources/Starknet/randomness/randomness"
          center={false}
          className="mr-auto ml-auto w-fit lg:ml-0"
        >
          Integrate VRF
        </ButtonLink>
      </div>
      <Image
        className="items-center align-middle"
        src="/assets/vectors/verifRand.svg"
        width={900}
        height={400}
        alt="Verifiable Randomness Illustration"
      />
    </div>
  );
};
export default VerifRandBox;
