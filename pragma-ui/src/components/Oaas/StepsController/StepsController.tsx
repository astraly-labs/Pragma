import React, { useState } from "react";
import StepsIndicator from "./StepsIndicator";
import styles from "./StepsController.module.scss";
import { Button } from "../../common/Button";

const StepsController = ({ steps, manageNextStepValidation, stepsAmount }) => {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const onNextStep = async () => {
    setIsValidating(true);
    try {
      const isValid = await manageNextStepValidation(step);
      if (isValid) {
        if (step !== stepsAmount) {
          setStep(step + 1);
          setErrorMessage(""); // Clear error message on successful validation
          window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
        }
      } else {
        setErrorMessage("Please complete all required fields before proceeding.");
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
        <StepsIndicator step={step} stepsAmount={stepsAmount} />
      </div>
      <div className={styles.formContainer}>
        <div> {steps[step - 1]}</div>
        {errorMessage && (
          <div className="mt-4 text-sm text-red-500">{errorMessage}</div>
        )}
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => onNextStep()}
            title={step !== stepsAmount ? "Next step" : "Send form"}
            aria-label={step !== stepsAmount ? "Next step" : "Send form"}
            variant="solid"
            color="mint"
            center={true}
            disabled={isValidating}
          >
            {isValidating 
              ? "Processing..." 
              : step !== stepsAmount 
                ? "Next" 
                : "Send"
            }
          </Button>
          {step !== 1 && (
            <Button
              onClick={() => {
                setStep(step - 1);
                window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
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

export default StepsController;
