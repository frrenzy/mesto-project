import { openBigPicture } from "./modal.js";
import { storage } from "./storage.js";
import { addLike, deleteLike } from "./api.js";


const picsGrid = document.querySelector('.pics__grid');
const picTemplate = document.querySelector('#pic-template').content;


const toggleLike = (like, counter, cardId) => {
  if (like.classList.contains('pics__like_active')) {
    like.classList.remove('pics__like_active');
    counter.textContent = +(counter.textContent) - 1;
    deleteLike(cardId).then(() => {});
  } else {
    like.classList.add('pics__like_active');
    counter.textContent = +(counter.textContent) + 1;
    addLike(cardId).then(() => {});
  }
}

const renderCard = card => {
  const picElement = createCard(card);
  picsGrid.prepend(picElement);
}

const createCard = card => {
  const picElement = picTemplate.querySelector('li').cloneNode(true);
  const picElementPicture = picElement.querySelector('.pics__pic');
  const picElementDelete = picElement.querySelector('.pics__delete');
  const picElementLike = picElement.querySelector('.pics__like');
  const picElementLikeCounter = picElement.querySelector('.pics__like-counter');

  picElementPicture.src = card.link;
  picElementPicture.alt = card.name;
  picElementPicture.dataset.id = card._id;
  picElementLikeCounter.textContent = card.likes.length;
  picElement.querySelector('.pics__pic-name').textContent = card.name;

  if (card.likes.find(item => item._id === storage.getItem('profileId'))) {
    picElementLike.classList.add('pics__like_active')
  }

  if (card.owner._id !== storage.getItem('profileId')) {
    picElementDelete.classList.add('pics__delete_hidden');
  }

  picElementPicture.addEventListener('click', () => {
    openBigPicture(picElementPicture);
  });

  picElementLike.addEventListener('click', () => {
    toggleLike(picElementLike, picElementLikeCounter, picElementPicture.dataset.id)
  });

  picElementDelete.addEventListener('click', evt => {
    evt.target.closest('li').remove();
  });

  return picElement;
}

export {
  renderCard
}
