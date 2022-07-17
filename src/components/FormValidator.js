export default class FormValidator {
  #config
  #formElement

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
  }

  #hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState(inputList, buttonElement) {
    if (this.#hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.#config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this.#config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  #showInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.#config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#config.errorClass);
  };

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.#config.inputErrorClass);
    errorElement.classList.remove(this.#config.errorClass);
    errorElement.textContent = '';
  };

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  };

  #setEventListeners() {
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      ...restParameters
    } = this.#config;
    const inputList = Array.from(this.#formElement.querySelectorAll(inputSelector));
    const buttonElement = this.#formElement.querySelector(submitButtonSelector);

    this.#toggleButtonState(inputList, buttonElement);

    this.#formElement.addEventListener('submit', () => {
      this.#toggleButtonState(inputList, buttonElement);
    });

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement, restParameters);
        this.#toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this.#formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this.#setEventListeners();
  }
}
