// Render
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

const picsGrid = document.querySelector('.pics__grid');
const picTemplate = document.querySelector('#pic-template').content;

const renderCard = card => {
  const liElement = document.createElement('li');
  const picElement = picTemplate.querySelector('.pics__grid-item').cloneNode(true);

  picElement.querySelector('.pics__pic').src = card.link;
  picElement.querySelector('.pics__pic').alt = card.name;
  picElement.querySelector('.pics__pic-name').textContent = card.name;
  picElement.querySelector('.pics__like').addEventListener('click', evt => {
    evt.target.classList.toggle('pics__like_active');
  });

  liElement.append(picElement);
  picsGrid.append(liElement);
}

initialCards.forEach(renderCard);

// Profile edit form
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const name = document.querySelector('.popup__input[name="name"]');
const description = document.querySelector('.popup__input[name="description"]');

const closePopup = () => popup.classList.remove('popup_opened');

document.querySelector('.profile__edit').addEventListener('click', () => {
  name.value = profileName.textContent;
  description.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
});

formElement.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = name.value;
  profileDescription.textContent = description.value;

  name.value = '';
  description.value = '';

  closePopup();
});

popup.querySelector('.popup__close').addEventListener('click', closePopup);
