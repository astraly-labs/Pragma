"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/common/Button";
import { Steps } from "./steps";
import styles from "./StepsController.module.scss";

type StepperProps = {
  steps: JSX.Element[];
  manageNextStepValidation: (currentStep: number) => Promise<boolean>;
  stepsAmount: number;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export const Stepper = ({
  steps,
  manageNextStepValidation,
  stepsAmount,
  currentStep,
  setCurrentStep,
}: StepperProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const onNextStep = async () => {
    setIsValidating(true);
    try {
      const isValid = await manageNextStepValidation(currentStep);
      if (isValid) {
        if (currentStep !== stepsAmount) {
          setCurrentStep(currentStep + 1);
          setErrorMessage("");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setErrorMessage(
          "Please complete all required fields before proceeding."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.indicatorContainer}>
        <Steps step={currentStep} stepsAmount={stepsAmount} />
      </div>
      <div className={styles.formContainer}>
        <div> {steps[currentStep - 1]}</div>
        {errorMessage && (
          <div className="mt-4 text-sm text-red-500">{errorMessage}</div>
        )}
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => onNextStep()}
            title={currentStep !== stepsAmount ? "Next step" : "Send form"}
            aria-label={currentStep !== stepsAmount ? "Next step" : "Send form"}
            variant="solid"
            color="mint"
            center={true}
            disabled={isValidating}
          >
            {isValidating
              ? "Processing..."
              : currentStep !== stepsAmount
              ? "Next"
              : "Send"}
          </Button>
          {currentStep !== 1 && (
            <Button
              onClick={() => {
                setCurrentStep(currentStep - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Previous step"
              aria-label="Previous step"
              variant="outline"
              color="mint"
              center={true}
              disabled={isValidating}
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
