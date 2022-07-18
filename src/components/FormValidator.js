export default class FormValidator {
  #formElement
  #inputList
  #submitButton
  #inactiveButtonClass
  #inputErrorClass
  #errorClass

  constructor({
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    }, formElement) {

    this.#formElement = formElement;
    this.#submitButton = this.#formElement.querySelector(submitButtonSelector);
    this.#inactiveButtonClass = inactiveButtonClass;
    this.#inputErrorClass = inputErrorClass;
    this.#errorClass = errorClass;
    this.#inputList = Array.from(this.#formElement.querySelectorAll(inputSelector));
  }

  static #hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState() {
    if (FormValidator.#hasInvalidInput(this.#inputList)) {
      this.#submitButton.classList.add(this.#inactiveButtonClass);
      this.#submitButton.setAttribute('disabled', '');
    } else {
      this.#submitButton.classList.remove(this.#inactiveButtonClass);
      this.#submitButton.removeAttribute('disabled');
    }
  }

  #showInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#errorClass);
  };

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
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
    this.#toggleButtonState(this.#inputList, this.#submitButton);

    this.#formElement.addEventListener('reset', () => {
      this.#toggleButtonState();
    });

    this.#inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
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
