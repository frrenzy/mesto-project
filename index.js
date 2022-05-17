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

initialCards.forEach(card => {
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
})
