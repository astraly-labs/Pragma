"use client";

import AssetHero from "@/components/common/AssetHero";
import BoxContainer from "@/components/common/BoxContainer";
import { Button } from "@/components/common/Button";
import { useEffect } from "react";

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
    <div className="relative flex w-full max-w-[1700px] flex-col items-start gap-[10px] overflow-x-hidden rounded-[20px] border border-[rgba(181,240,229,0.12)] bg-[rgba(27,99,82,0.12)] p-[36px]">
      <AssetHero
        title="Every asset"
        greenTitle="priced the best way"
        description="Explore the assets supported by Pragma, priced in the most efficient way. Best pricing, no fluff."
        solidButton="Read docs"
        solidButtonLink="https://docs.pragma.build"
        illustrationLink="/assets/vectors/chart.svg"
        illustrationSmallLink="/assets/vectors/chartSmall.svg"
      />
      <BoxContainer>
        <h2 className="text-white">Something went wrong!</h2>
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
