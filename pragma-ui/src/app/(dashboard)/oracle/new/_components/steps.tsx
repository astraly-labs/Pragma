"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/solid";
import styles from "./StepsController.module.scss";

const STEPS_LABELS = ["Oracle type", "Payment", "Assets", "Sources"];

export const Steps = ({ step, stepsAmount }) => {
  const getStepsIndicator = () => {
    const stepsAmountArray: number[] = [];
    for (let i = 1; i <= stepsAmount; i++) {
      stepsAmountArray.push(i);
    }
    return stepsAmountArray;
  };

  return (
    <div className={styles.stepsContainer}>
      {getStepsIndicator().map((item, index) => (
        <div className={styles.step} key={item}>
          <div
            className={cn(styles.stepContent, {
              [styles.activeStep]: item === step,
            })}
          >
            <span className={styles.stepNumber}>
              {item < step ? (
                <CheckIcon className={styles.checkmark} aria-hidden="true" />
              ) : (
                `${item}.`
              )}
            </span>
            <span className={styles.stepLabel}>{STEPS_LABELS[index]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
