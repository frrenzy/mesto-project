import { openBigPicture } from "./modal.js";


const picsGrid = document.querySelector('.pics__grid');
const picTemplate = document.querySelector('#pic-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const renderCard = card => {
  const picElement = createCard(card);
  picsGrid.prepend(picElement);
}

const createCard = card => {
  const picElement = picTemplate.querySelector('li').cloneNode(true);
  const picElementPicture = picElement.querySelector('.pics__pic');

  picElementPicture.src = card.link;
  picElementPicture.alt = card.name;
  picElement.querySelector('.pics__pic-name').textContent = card.name;

  picElementPicture.addEventListener('click', () => {
    openBigPicture(picElementPicture);
  });
  picElement.querySelector('.pics__like').addEventListener('click', evt => {
    evt.target.classList.toggle('pics__like_active');
  });
  picElement.querySelector('.pics__delete').addEventListener('click', evt => {
    evt.target.closest('li').remove();
  });

  return picElement;
}

export {
  initialCards,
  renderCard
}
