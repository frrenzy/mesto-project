export default class FormValidator {
  #config
  #formElement

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
  }

  hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState = (inputList, buttonElement, className) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(className);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(className);
      buttonElement.removeAttribute('disabled');
    }
  }

  showInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
  };

  hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

  checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };

  setEventListeners = (formElement, config) => {
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      ...restParameters
    } = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    formElement.addEventListener('submit', () => {
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, restParameters);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  enableValidation = (config) => {
    const {formSelector, ...restParameters} = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });

      setEventListeners(formElement, restParameters);
    });
  };

}
