"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import classNames from "classnames";
import BoxContainer from "@/components/common/BoxContainer";
import { Button } from "@/components/common/Button";
import styles from "@/pages/styles.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden pt-24 md:pt-40",
        styles.bigScreen
      )}
    >
      <BoxContainer>
        <Link
          href="/assets"
          className="flex w-full cursor-pointer items-center gap-2 text-left text-sm uppercase tracking-widest text-lightGreen"
        >
          <Image
            className="my-auto pl-2"
            height={30}
            width={30}
            alt="arrowDown"
            src="/assets/vectors/prev.svg"
          />
          Back to feeds
        </Link>
      </BoxContainer>
      <BoxContainer>
        <h2 className="text-white">Something went wrong!</h2>
        {process.env.NODE_ENV === "development" && (
          <p className="text-white">{error.message}</p>
        )}
        <Button
          center={false}
          color="mint"
          variant="outline"
          type="button"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </BoxContainer>
    </div>
  );
}
