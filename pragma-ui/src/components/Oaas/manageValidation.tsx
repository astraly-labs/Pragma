const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const getErrors = (state, keys) => {
  return Object.entries(state)
    .filter(([key]) => keys.includes(key))
    .filter(([key, value]) =>
      key === "email"
        ? !validateEmail(value as string)
        : !(value as string)?.length
    )
    .map(([key]) => key);
};

const cancelValidationError = (
  filterType,
  setValidationError,
  validationError
) => {
  setValidationError(
    validationError.filter((errorItem) => errorItem !== filterType)
  );
};

const checkIsValidFormSteps = ({ formData, step }) => {
  const { name, address, website, email } = formData;

  if (step === 1) {
    return !!name;
  }
  if (step === 2) {
    return !!(address && website);
  }
  if (step === 3) {
    return !!validateEmail(email);
  }
};

const updateErrorsFormSteps = ({ formData, setValidationError, step }) => {
  if (step === 1) {
    const errors = getErrors(formData, ["name"]);
    setValidationError(errors);
  }
  if (step === 2) {
    const errors = getErrors(formData, ["website", "address"]);
    setValidationError(errors);
  }
  if (step === 3) {
    const errors = getErrors(formData, ["email"]);
    setValidationError(errors);
  }
};

export { cancelValidationError, checkIsValidFormSteps, updateErrorsFormSteps };
