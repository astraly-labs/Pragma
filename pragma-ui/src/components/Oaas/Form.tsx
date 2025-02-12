import React, { useState } from "react";
import { useRouter } from "next/router";
import StepsController from "./StepsController/StepsController";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import styles from "./Form.module.scss";

const SpotForm = () => {
  const router = useRouter();
  const [validationError, setValidationError] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    assetAddress: "",
    tokenName: "",
    ticker: "",
    network: "",
    selectedPairs: [],
  });

  const handleClick = () => {
    router.push("/assets?source=sepolia");
  };

  const handleFieldChange = (name, value, isRequired) => {
    setFormData({ ...formData, [name]: value });
    isRequired &&
      setValidationError(
        validationError.filter((errorItem) => errorItem !== name)
      );
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const manageNextStepValidation = (currentStep) => {
    if (currentStep === 1 && !formData.type) {
      if (!validationError.includes("type")) {
        setValidationError([...validationError, "type"]);
      }
      return false;
    }

    if (currentStep === 2) {
      if (window.validateStep2) {
        return window.validateStep2();
      }
      return false;
    }

    if (currentStep === 3) {
      handleSubmit();
    }

    return true;
  };

  const steps = [
    <FirstStep formData={formData} handleFieldChange={handleFieldChange} />,
    <SecondStep formData={formData} handleFieldChange={handleFieldChange} />,
    <ThirdStep formData={formData} handleFieldChange={handleFieldChange} />,
  ];

  return (
    <div className="min-h-screen w-full pt-40">
      <div className={styles.container}>
        <StepsController
          manageNextStepValidation={manageNextStepValidation}
          steps={steps}
          stepsAmount={3}
        />
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-lightBlur bg-opacity-50">
          <div className="rounded-lg bg-darkGreen p-8 text-center">
            <h3 className="mb-4 text-2xl text-mint">Success!</h3>
            <p className="mb-6 text-lightGreen">
              Your oracle has been successfully created.
            </p>
            <button
              onClick={handleClick}
              className="rounded-full bg-mint px-6 py-2 text-darkGreen hover:bg-opacity-90"
            >
              Check dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotForm;
