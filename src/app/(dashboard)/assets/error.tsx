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
    <div className="relative flex w-full max-w-[1700px] flex-col items-start gap-6 px-6 pt-28 pb-16">
      <AssetHero
        title="The data behind"
        greenTitle="every decision."
        description="Inspect prices, source observations, and publisher activity."
        solidButton="Read docs"
        solidButtonLink="https://docs.pragma.build"
      />
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
