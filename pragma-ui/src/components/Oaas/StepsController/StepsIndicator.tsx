import React from "react";
import cx from "classnames";
import Icon from "../Icon/Icon";
import CheckedIcon from "./checked.svg";
import styles from "./StepsController.module.scss";
import { CheckIcon } from "@heroicons/react/solid";

const StepsIndicator = ({ step, stepsAmount }) => {
  const stepLabels = ["Oracle type", "Assets", "Sources"];

  const getStepsIndicator = () => {
    const stepsAmountArray = [];
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
            className={cx(styles.stepContent, {
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
            <span className={styles.stepLabel}>{stepLabels[index]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;
