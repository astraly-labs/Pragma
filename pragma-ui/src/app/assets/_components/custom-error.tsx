"use client";

import BoxContainer from "@/components/common/BoxContainer";
import { Button } from "@/components/common/Button";

export const CustomError = (props: { error: Error; reset?: () => void }) => {
  return (
    <BoxContainer>
      <h2 className="text-white">Something went wrong!</h2>
      {process.env.NODE_ENV === "development" && (
        <p className="text-white">{props.error.message}</p>
      )}
      <Button
        center={false}
        color="mint"
        variant="outline"
        type="button"
        onClick={() => props.reset?.()}
      >
        Try again
      </Button>
    </BoxContainer>
  );
};
