import { renderCard } from "./card.js";
import {profileName, profileDescription, profileAvatar, closePopup, openPopup, toggleLoading} from "./utils.js";
import { popups, openProfileEditPopup } from "./modal.js";
import { cardFormElement, profileFormElement } from "./forms.js";
import { enableValidation } from "./validate.js";
import { addCard, getCards, getUser } from "./api.js";
import { storage } from "./storage.js";

import '../pages/index.css';


getUser()
  .then(data => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
    storage.setItem('profileId', data._id);
  })
  .catch(err => console.log(err));

getCards()
  .then(data => {
    data.forEach(card => {
      renderCard(card)
    });
  })
  .catch(err => console.log(err));



document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardPopupElement);
})

document.querySelector('.profile__edit').addEventListener('click', () => {
  openProfileEditPopup();
});


const { cardPopupElement, picturePopupElement, profilePopupElement } = popups

cardFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  toggleLoading(cardFormElement, true);

  addCard({
    name: cardFormElement.elements.name.value,
    link: cardFormElement.elements.link.value
  })
    .then(card => {
      renderCard(card)
      cardFormElement.reset();
    })
    .finally(() => {
      closePopup(cardPopupElement);
      toggleLoading(cardFormElement, false)
    })
});

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = profileFormElement.elements.name.value;
  profileDescription.textContent = profileFormElement.elements.description.value;

  closePopup(profilePopupElement);
});

Array.from(Object.values(popups)).forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
