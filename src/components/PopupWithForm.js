import Popup from "./Popup";


export default class PopupWithForm extends Popup {
  #submitter
  #form
  #init
  #submitButton
  #inputs

  constructor(selector, submitCallback, init = () => {}) {
    super(selector);
    this.#submitter = submitCallback;
    this.#form = this._popup.querySelector('.popup__form')
    this.#init = init;
    this.#submitButton = this.#form.querySelector('.popup__submit');
    this.#inputs = this.#form.querySelectorAll('.popup__input')
  }

  #getInputValues() {
    const values = {};
    this.#inputs?.forEach(input => {
      values[input.name] = input.value
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', () => {
      this.#submitter(this.#getInputValues());
    })
  }

  openPopup() {
    const initData = this.#init();
    if (initData) {
      Object.keys(initData).forEach(inputName => {
        this.#form.elements[inputName].value = initData[inputName]
      })
    }
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }

  reset() {
    this.#form.reset();
  }

  toggleLoading = (isLoading, text='Сохранить') => {
    this
      .#submitButton
      .textContent = isLoading ? 'Сохранение...' : text;
  }
}
