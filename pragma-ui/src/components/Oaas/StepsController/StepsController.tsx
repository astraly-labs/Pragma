import React, { useState } from "react";
import StepsIndicator from "./StepsIndicator";
import styles from "./StepsController.module.scss";
import { Button } from "../../common/Button";

const StepsController = ({ steps, manageNextStepValidation, stepsAmount }) => {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const onNextStep = () => {
    if (manageNextStepValidation(step)) {
      if (step !== stepsAmount) {
        setStep(step + 1);
        setErrorMessage(""); // Clear error message on successful validation
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
      }
    } else {
      setErrorMessage("Please select an option before proceeding.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.indicatorContainer}>
        <StepsIndicator step={step} stepsAmount={stepsAmount} />
      </div>
      <div className={styles.formContainer}>
        <div> {steps[step - 1]}</div>
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => onNextStep()}
            title={step !== stepsAmount ? "Next step" : "Send form"}
            aria-label={step !== stepsAmount ? "Next step" : "Send form"}
            variant="solid"
            color="mint"
            center={true}
          >
            {step !== stepsAmount ? "Next" : "Send"}
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
