"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import styles from "@/app/(dashboard)/oracle/new/_components/Form.module.scss";
import { FormData } from "@/app/(dashboard)/oracle/new/_types";

type FirstStepProps = {
  formData: FormData;
  handleFieldChange: (
    name: string,
    value: string | number | boolean | [],
    isRequired?: boolean
  ) => void;
};

export const FirstStep = ({ formData, handleFieldChange }: FirstStepProps) => {
  useEffect(() => {
    if (!formData.type) {
      handleFieldChange("type", "api", true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select oracle type</h2>
      <div className="flex max-w-xl flex-col gap-4">
        <button
          className={cn("cursor-pointer rounded-lg bg-lightBlur p-4", {
            "border-2 border-mint": formData.type === "api",
          })}
          onClick={() => handleFieldChange("type", "api", true)}
          type="button"
        >
          <h3 className="text-lg text-lightGreen">API Oracle</h3>
          <p className="text-grey-4 text-sm text-LightGreenFooter">
            Create an API Oracle to plug your low-latency application.
          </p>
        </button>

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
