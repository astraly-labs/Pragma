import React from "react";
import cx from "classnames";
import Icon from "../Icon/Icon";
import CheckedIcon from "./checked.svg";
import styles from "./StepsController.module.scss";

const StepsIndicator = ({ step, stepsAmount }) => {
  const getStepsIndicator = () => {
    const stepsAmountArray = [];
    for (let i = 1; i <= stepsAmount; i++) {
      stepsAmountArray.push(i);
    }
    return stepsAmountArray;
  };

  return (
    <div className={styles.stepsContainer}>
      {getStepsIndicator().map((item) => (
        <div className={styles.step} key={item}>
          <div className={styles.circleContainer}>
            {item > 1 && (
              <div
                className={cx(styles.stem, {
                  [styles.stemActive]: item === step || step > item,
                })}
              ></div>
            )}
            <div
              className={cx(styles.circle, {
                [styles.circleActive]: item === step || step > item,
              })}
            >
              {step > item ? (
                <Icon name={CheckedIcon} className={styles.checkedIcon} />
              ) : (
                <div
                  className={cx(styles.circleIn, {
                    [styles.circleInActive]: item === step || step > item,
                  })}
                ></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;
