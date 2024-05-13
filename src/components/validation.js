export { enableValidation, clearValidation }

const showInputError = (formEl, inputElement, errorMessage, validationConfig) => {
  const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formEl, inputElement, validationConfig) => {
const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formEl, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
  inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
  showInputError(formEl, inputElement, inputElement.validationMessage, validationConfig);
  }
  else {
  hideInputError(formEl, inputElement, validationConfig);
  }
};

const setEventListeners = (formEl, validationConfig) => {
  const inputList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formEl.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formEl, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}; 

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formEl) => {
  setEventListeners(formEl, validationConfig);
  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
})};

function toggleButtonState(inputList, buttonElement, validationConfig){
if (hasInvalidInput(inputList, validationConfig)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
} else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}
};

// Функция очистки ошибок валидации 
const clearValidation = (formEl, validationConfig) => {
  const inputList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formEl.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formEl, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
};

