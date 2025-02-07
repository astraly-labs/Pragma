import React, { useState } from "react";
import Button from "../Button/Button";
import StepsIndicator from "./StepsIndicator";
import styles from "./StepsController.module.scss";

const StepsController = ({ steps, manageNextStepValidation, stepsAmount }) => {
  const [step, setStep] = useState(1);

  const onNextStep = () => {
    if (step !== stepsAmount) {
      setStep(step + 1);
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
            className={styles.nextButton}
            onClick={() => onNextStep()}
            title={step !== stepsAmount ? "Next step" : "Send form"}
            ariaLabel={step !== stepsAmount ? "Next step" : "Send form"}
          >
            {step !== stepsAmount ? "Next" : "Send"}
          </Button>
          {step !== 1 && (
            <Button
              className={styles.backButton}
              onClick={() => setStep(step - 1)}
              title="Previous step"
              ariaLabel="Previous step"
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
