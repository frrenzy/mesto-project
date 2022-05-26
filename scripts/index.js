// Popups
const profilePopupElement = document.querySelector('.popup_type_profile');
const cardPopupElement = document.querySelector('.popup_type_card');
const picturePopupElement = document.querySelector('.popup_type_picture');

// Gallery & card template
const picsGrid = document.querySelector('.pics__grid');
const picTemplate = document.querySelector('#pic-template').content;

// Card popup
const cardFormElement = cardPopupElement.querySelector('.popup__form[name="add-card"]');
const picNameInputElement = cardFormElement.querySelector('.popup__input[name="pic-name"]');
const linkInputElement = cardFormElement.querySelector('.popup__input[name="link"]');

// Pic popup
const picturePopupPicture = picturePopupElement.querySelector('.popup__picture');
const picturePopupCaption = picturePopupElement.querySelector('.popup__title');

// Profile popup
const profileFormElement = profilePopupElement.querySelector('.popup__form[name="edit-profile"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInputElement = profileFormElement.querySelector('.popup__input[name="name"]');
const descriptionInputElement = profileFormElement.querySelector('.popup__input[name="description"]');



// Common popup functions
const closePopup = popup => popup.classList.remove('popup_opened');
const openPopup = popup => popup.classList.add('popup_opened');

// Gallery
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

const renderCard = card => {
  const picElement = createCard(card);

  picsGrid.prepend(picElement);
}

//Profile popup
function populateProfileForm() {
  nameInputElement.value = profileName.textContent;
  descriptionInputElement.value = profileDescription.textContent;
}

function openProfileEditPopup() {
  populateProfileForm();

  openPopup(profilePopupElement);
}

// Picture popup
const openBigPicture = card => {
  picturePopupPicture.src = card.src;
  picturePopupPicture.alt = card.alt;

  picturePopupCaption.textContent = card.alt;

  openPopup(picturePopupElement);
}



// Initialize gallery
initialCards.forEach(renderCard);

// Popups
document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

// Card form
document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardPopupElement);
})

cardFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  renderCard({
    name: picNameInputElement.value,
    link: linkInputElement.value
  });

  cardFormElement.reset();

  closePopup(cardPopupElement);
});

// Profile form
document.querySelector('.profile__edit').addEventListener('click', () => {
  openProfileEditPopup();
});

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = nameInputElement.value;
  profileDescription.textContent = descriptionInputElement.value;

  closePopup(profilePopupElement);
});
