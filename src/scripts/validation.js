function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  });
}

function setEventListeners(formElement, validationConfig) {
  const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputElements, submitButton, validationConfig);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputElements, submitButton, validationConfig);
    });
  });
};

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

function toggleButtonState(inputElements, buttonElement, validationConfig) {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputElements) {
  return inputElements.some(input => {
    return !input.validity.valid;
  });
}

function clearValidation(formElement, validationConfig) {
  const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputElements.forEach(inputElement => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  });
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearValidation };
