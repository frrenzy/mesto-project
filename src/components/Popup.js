export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  #handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.closePopup()
    }
  }

  closePopup() {
    document.removeEventListener('keydown', this.#handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup()
        return
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup()
      }
    })
  }
}
