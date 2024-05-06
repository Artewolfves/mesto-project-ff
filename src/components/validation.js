export { enableValidation, validationConfig, clearValidation }

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const showInputError = (formEl, inputElement, errorMessage) => {
  const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formEl, inputElement) => {
const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formEl, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
  inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
  showInputError(formEl, inputElement, inputElement.validationMessage);
  }
  else {
  hideInputError(formEl, inputElement);
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formEl.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formEl) => {
      formEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListeners(formEl);
  });
};


function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
})
};

function toggleButtonState(inputList, buttonElement){

if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
} else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}
};

// Функция очистки ошибок валидации 
const clearValidation = (formEl, validationConfig) => { 
  const inputList = Array.from( 
    formEl.querySelectorAll(validationConfig.inputSelector), 
  ); 
  
  inputList.forEach((inputElement) => { 
    inputElement.value = ""; 
    hideInputError(formEl, inputElement, validationConfig.inputErrorClass); 
  });
};

