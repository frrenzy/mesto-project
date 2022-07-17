export default class Popup {
  #popup
  #opened

  constructor(selector) {
    this.#popup = document.querySelector(selector)
    this.#opened = false
  }

  #handleEscClose() {

  }

  closePopup() {
    document.removeEventListener('keydown', () => {
      this.#handleEscClose()
    })
    this.#popup.classList.remove('popup_opened');
  }

  openPopup() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', () => {
      this.#handleEscClose()
    })
  }

  setEventListeners() {
    this.#popup.addEventListener('mousedown', evt => {
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
