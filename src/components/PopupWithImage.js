import Popup from "./Popup";


export default class PopupWithImage extends Popup {
  #pic
  #title

  constructor(selector) {
    super(selector);
    this.#pic = this._popup.querySelector('.popup__picture');
    this.#title = this._popup.querySelector('.popup__title');
  }

  openPopup(link, name) {
    this.#pic.src = link;
    this.#pic.alt = name;
    this.#title.textContent = name;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this.#pic.src = '';
    this.#title.textContent = '';
    this.#pic.alt = '';
  }
}
