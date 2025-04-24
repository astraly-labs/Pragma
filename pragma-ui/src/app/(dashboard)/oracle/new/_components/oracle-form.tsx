"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Form.module.scss";
import { Stepper } from "./stepper";
import { FirstStep } from "./steps/first-step";
import { SecondStep } from "./steps/second-step";
import { ThirdStep } from "./steps/third-step";
import { FourthStep } from "./steps/fourth-step";
import { FormData } from "../_types";

export const OracleForm = ({
  isSubscriptionActive,
}: {
  isSubscriptionActive: boolean;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: "api",
    assetAddress: "",
    tokenName: "",
    ticker: "",
    network: "",
    selectedPairs: [],
    sources: [],
  });

  const handleFieldChange = (
    name: string,
    value: string,
    isRequired?: boolean
  ) => {
    setFormData({ ...formData, [name]: value });
    isRequired &&
      setValidationError(
        validationError.filter((errorItem) => errorItem !== name)
      );
  };

  console.log({ currentStep });

  const manageNextStepValidation = async (currentStep: number) => {
    if (currentStep === 1 && !formData.type) {
      if (!validationError.includes("type")) {
        setValidationError([...validationError, "type"]);
      }
      return false;
    }

    // if (currentStep === 3) {
    //   if (window.validateStep3 && window.submitStep3) {
    //     const isValid = window.validateStep3();
    //     if (!isValid) return false;

    //     const success = await window.submitStep3();
    //     return success;
    //   }
    //   return false;
    // }

    if (currentStep === 4) {
      setShowSuccess(true);
    }

    return true;
  };

  useEffect(() => {
    if (isSubscriptionActive) {
      setCurrentStep(3);
    }
  }, [isSubscriptionActive]);

  const steps = [
    <FirstStep formData={formData} handleFieldChange={handleFieldChange} />,
    <SecondStep />,
    <ThirdStep formData={formData} handleFieldChange={handleFieldChange} />,
    <FourthStep />,
    // <FifthStep formData={formData} handleFieldChange={handleFieldChange} />,
  ];

  return (
    <div className="min-h-screen w-full pt-40">
      <div className={styles.container}>
        <Stepper
          manageNextStepValidation={manageNextStepValidation}
          steps={steps}
          stepsAmount={4}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-lightBlur bg-opacity-50">
          <div className="rounded-lg bg-darkGreen p-8 text-center">
            <h3 className="mb-4 text-2xl text-mint">Success!</h3>
            <p className="mb-6 text-lightGreen">
              Your oracle has been successfully created.
            </p>
            <Link
              href="/assets?source=api"
              className="rounded-full bg-mint px-6 py-2 text-darkGreen hover:bg-opacity-90"
            >
              Check dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
