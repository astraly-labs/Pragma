import React, { useState } from "react";
import StepsController from "./StepsController/StepsController";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import {
  checkIsValidFormSteps,
  updateErrorsFormSteps,
} from "./manageValidation";
import styles from "./Form.module.scss";

const SpotForm = () => {
  const [validationError, setValidationError] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    assetAddress: "",
    baseCurrency: "",
    quoteCurrency: "",
    network: "",
    selectedPairs: [],
  });

  const handleFieldChange = (name, value, isRequired) => {
    setFormData({ ...formData, [name]: value });
    isRequired &&
      setValidationError(
        validationError.filter((errorItem) => errorItem !== name)
      );
  };

  const manageNextStepValidation = (step) => {
    const isValid = checkIsValidFormSteps({ formData, step });
    if (!isValid) {
      updateErrorsFormSteps({
        formData,
        step,
        setValidationError,
      });
      return false;
    }

    if (step === 3 && isValid) {
      handleSubmit();
    }
    return true;
  };

  const handleSubmit = () => {
    alert("The form is valid. You can now submit the data: to the server.");
  };

  const steps = [
    <FirstStep formData={formData} handleFieldChange={handleFieldChange} />,
    <SecondStep formData={formData} handleFieldChange={handleFieldChange} />,
    <ThirdStep formData={formData} handleFieldChange={handleFieldChange} />,
  ];

  return (
    <div className="pt-40">
      <div className={styles.container}>
        <StepsController
          manageNextStepValidation={manageNextStepValidation}
          steps={steps}
          stepsAmount={3}
        />
      </div>
    </div>
  );
};

export default SpotForm;
