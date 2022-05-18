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
  picsGrid.prepend(liElement);
}

initialCards.forEach(renderCard);


// Common popup functions
const closePopup = element => element.parentElement.classList.remove('popup_opened');
const openPopup = element => element.parentElement.classList.add('popup_opened');

document.querySelector('.popup__close').addEventListener('click', evt => {
  closePopup(evt.target);
});


// Profile edit form
const profileFormElement = document.querySelector('.popup__container[name="edit-profile"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInputElement = profileFormElement.querySelector('.popup__input[name="name"]');
const descriptionInputElement = profileFormElement.querySelector('.popup__input[name="description"]');

document.querySelector('.profile__edit').addEventListener('click', () => {
  nameInputElement.value = profileName.textContent;
  descriptionInputElement.value = profileDescription.textContent;

  openPopup(profileFormElement);
});

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = nameInputElement.value;
  profileDescription.textContent = descriptionInputElement.value;

  nameInputElement.value = '';
  descriptionInputElement.value = '';

  closePopup(profileFormElement);
});


// Add card form
const cardFormElement = document.querySelector('.popup__container[name="add-card"]');
const picNameInputElement = cardFormElement.querySelector('.popup__input[name="pic-name"]');
const linkInputElement = cardFormElement.querySelector('.popup__input[name="link"]');

document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardFormElement);
})

cardFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  renderCard({
    name: picNameInputElement.value,
    link: linkInputElement.value
  });

  closePopup(cardFormElement);
});
