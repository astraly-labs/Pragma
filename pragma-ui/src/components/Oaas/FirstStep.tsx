import React from "react";
import styles from "./Form.module.scss";

const FirstStep = ({ formData, handleFieldChange }) => {
  React.useEffect(() => {
    // Pre-select API option on component mount
    if (!formData.type) {
      handleFieldChange("type", "api", true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select oracle type</h2>
      <div className="flex max-w-xl flex-col gap-4">
        <div
          className={`cursor-pointer rounded-lg bg-lightBlur p-4 ${
            formData.type === "api" ? "border-2 border-mint" : ""
          }`}
          onClick={() => handleFieldChange("type", "api", true)}
        >
          <h3 className="text-lg text-lightGreen">API Oracle</h3>
          <p className="text-grey-4 text-sm text-LightGreenFooter">
            Create an API Oracle to plug your low-latency application.
          </p>
        </div>

        {["centralized", "decentralized", "zk-proven"].map((type) => (
          <div
            key={type}
            className="relative cursor-not-allowed rounded-lg bg-lightBlur p-4 opacity-50"
          >
            <div className="absolute right-2 top-2">
              <span className="rounded-full bg-mint px-2 py-1 text-xs text-darkGreen">
                Soon
              </span>
            </div>
            <h3 className="text-lg capitalize text-lightGreen">
              {type} Oracle
            </h3>
            <p className="text-grey-4 text-sm text-lightGreen">Coming soon</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstStep;
