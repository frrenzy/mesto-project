import Popup from "./Popup";


export default class PopupWithForm extends Popup {
  #submitter
  #form
  #init

  constructor(selector, submitCallback, init = () => {}) {
    super(selector);
    this.#submitter = submitCallback;
    this.#form = this._popup.querySelector('.popup__form')
    this.#init = init;
  }

  #getInputValues() {
    const values = {};
    this.#form.querySelectorAll('.popup__input')?.forEach(input => {
      values[input.name] = input.value
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', () => {
      this.#submitter(this.#getInputValues());
      this.closePopup();
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
    this.#form.reset();
  }

  toggleLoading = (isLoading, text='Сохранить') => {
    this
      .#form
      .querySelector('.popup__submit')
      .textContent = isLoading ? 'Сохранение...' : text;
  }
}
