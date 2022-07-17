import { openBigPicture, openDeletePopup } from "./modal";
import { storage } from "./storage";


export default class Card {
  #selector
  #name
  #link
  #id
  #likes
  #owner
  #element
  #addLike
  #deleteLike

  constructor(
    { name, link, _id, likes, owner },
    { addLike, deleteLike },
    selector
  ) {
    this.#link = link;
    this.#name = name;
    this.#selector = selector;
    this.#owner = owner;
    this.#id = _id;
    this.#likes = likes;
    this.#addLike = addLike;
    this.#deleteLike = deleteLike;
  }

  #getElement() {
    return document
      .querySelector(this.#selector)
      .content
      .querySelector('li')
      .cloneNode(true)
  }

  #toggleLike(like, counter) {
    if (like.classList.contains('pics__like_active')) {
      this.#deleteLike(this.#id)
        .then(data => {
          like.classList.remove('pics__like_active');
          counter.textContent = data.likes.length;
        })
        .catch(console.log);
    } else {
      this.#addLike(this.#id)
        .then(data => {
          like.classList.add('pics__like_active');
          counter.textContent = data.likes.length;
        })
        .catch(console.log);
    }
  }

  #deleteCard() {
    storage.setItem('cardId', this.#id);
    openDeletePopup(); // TODO Modal weak link
  }

  #setEventListeners(picElementPicture, picElementDelete, picElementLikeCounter, picElementLike) {
    picElementPicture.addEventListener('click', () => {
      openBigPicture(picElementPicture); // TODO Modal weak link
    });

    picElementLike.addEventListener('click', () => {
      this.#toggleLike(picElementLike, picElementLikeCounter, this.#id)
    });

    picElementDelete.addEventListener('click', () => {
      this.#deleteCard()
    });
  }

  createCardMarkup() {
    this.#element = this.#getElement();
    const picElementPicture = this.#element.querySelector('.pics__pic');
    const picElementDelete = this.#element.querySelector('.pics__delete');
    const picElementLike = this.#element.querySelector('.pics__like');
    const picElementLikeCounter = this.#element.querySelector('.pics__like-counter');

    picElementPicture.src = this.#link;
    picElementPicture.alt = this.#name;
    picElementPicture.dataset.id = this.#id;
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
}
