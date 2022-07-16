import { openBigPicture, openDeletePopup } from "./modal";
import { storage } from "./storage";
import { picsGrid } from "./constants"
import Api from "./Api";

export default class Card {
  #selector
  #name
  #link
  #_id
  #likes
  #owner
  #element

  constructor({ name, link, _id, likes, owner }, selector) {
    this.#link = link;
    this.#name = name;
    this.#selector = selector;
    this.#owner = owner;
    this.#_id = _id;
    this.#likes = likes;
  }

  #getElement() {
    return document
      .querySelector(this.#selector)
      .content
      .querySelector('li')
      .cloneNode(true)
  }

  #toggleLike(like, counter, cardId) {
    if (like.classList.contains('pics__like_active')) {
      Api.deleteLike(cardId) // TODO Api weak link
        .then(data => {
          like.classList.remove('pics__like_active');
          counter.textContent = data.likes.length;
        })
        .catch(console.log);
    } else {
      Api.addLike(cardId) // TODO Api weak link
        .then(data => {
          like.classList.add('pics__like_active');
          counter.textContent = data.likes.length;
        })
        .catch(console.log);
    }
  }

  #deleteCard() {
    storage.setItem('cardId', this.#_id);
    openDeletePopup(); // TODO Modal weak link
  }

  #setEventListeners(picElementPicture, picElementDelete, picElementLikeCounter, picElementLike) {
    picElementPicture.addEventListener('click', () => {
      openBigPicture(picElementPicture); // TODO Modal weak link
    });

    picElementLike.addEventListener('click', () => {
      this.#toggleLike(picElementLike, picElementLikeCounter, picElementPicture.dataset.id)
    });

    picElementDelete.addEventListener('click', () => {
      this.#deleteCard()
    });
  }

  #createCard() {
    this.#element = this.#getElement();
    const picElementPicture = this.#element.querySelector('.pics__pic');
    const picElementDelete = this.#element.querySelector('.pics__delete');
    const picElementLike = this.#element.querySelector('.pics__like');
    const picElementLikeCounter = this.#element.querySelector('.pics__like-counter');

    picElementPicture.src = this.#link;
    picElementPicture.alt = this.#name;
    picElementPicture.dataset.id = this.#_id;
    picElementLikeCounter.textContent = this.#likes.length;
    this.#element.querySelector('.pics__pic-name').textContent = this.#name;

    if (this.#likes.find(item => item._id === storage.getItem('profileId'))) {
      picElementLike.classList.add('pics__like_active')
    }

    if (this.#owner._id !== storage.getItem('profileId')) {
      picElementDelete.classList.add('pics__delete_hidden');
    }

    this.#setEventListeners(picElementPicture, picElementDelete, picElementLikeCounter, picElementLike);

    return this.#element;
  }

  renderCard() {
    const picElement = this.#createCard();
    picsGrid.prepend(picElement); // TODO move to section
  }
}
