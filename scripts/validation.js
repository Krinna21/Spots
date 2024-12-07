// Show error message
const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
};

// Hide error message
const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
};

// Check input validity
const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

// Check if any input is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

// Toggle submit button state
const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add("modal__submit-btn_disabled");
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove("modal__submit-btn_disabled");
    buttonEl.disabled = false;
  }
};

// Set event listeners for the form
const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__submit-btn");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
};

// Enable validation on the forms
const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

// Reset the form to its initial state
const resetForm = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  inputList.forEach((input) => {
    input.classList.remove("modal__input_type_error");
    const errorEl = formEl.querySelector(`#${input.id}-error`);
    errorEl.textContent = "";
  });

  buttonEl.classList.add("modal__submit-btn_disabled");
  buttonEl.disabled = true;
};

// Call enableValidation function when script runs
enableValidation();
