import React from "react";
import cx from "classnames";
import { Input } from "reactstrap";
import styles from "./Form.module.scss";

const FirstStep = ({ formData, handleFieldChange }) => {
  const oracleTypes = [
    { id: "centralized", label: "Centralized" },
    { id: "decentralized", label: "Decentralized" },
    { id: "api", label: "API" },
    { id: "zk-proven", label: "zk-proven" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose an oracle</h2>
      <form className="grid grid-cols-2 gap-4">
        {oracleTypes.map((type) => (
          <div key={type.id} className="relative">
            <input
              className="peer hidden"
              id={`radio_${type.id}`}
              type="radio"
              name="type"
              value={type.id}
              checked={formData.type === type.id}
              onChange={(e) => {
                console.log("Selected type:", e.target.value);
                handleFieldChange("type", e.target.value, true);
              }}
            />
            <label
              className="border- flex cursor-pointer flex-col rounded-lg border p-10 peer-checked:border-mint"
              htmlFor={`radio_${type.id}`}
            >
              <span className="p-2 text-center text-xs font-semibold uppercase text-lightGreen peer-checked:text-mint">
                {type.label}
              </span>
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default FirstStep;
