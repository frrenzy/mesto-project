import { renderCard } from "./card";
import {
  profileName, profileDescription, profileAvatar, avatarEditIcon,
  closePopup, openPopup, toggleLoading
} from "./utils";
import { popups, openProfileEditPopup } from "./modal";
import { avatarFormElement, cardFormElement, profileFormElement, deleteFormElement } from "./forms";
import { enableValidation } from "./validate";
import { addCard, deleteCard, editAvatar, editProfile, getCards, getUser } from "./api";
import { storage } from "./storage";

import '../pages/index.css';


const { cardPopupElement, profilePopupElement, avatarPopupElement, deletePopupElement } = popups;


Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
    storage.setItem('profileId', user._id);

    cards.reverse().forEach(card => {
      renderCard(card);
    });
  })
  .catch(console.log);


document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardPopupElement);
})

document.querySelector('.profile__edit').addEventListener('click', openProfileEditPopup);

avatarEditIcon.addEventListener('click', () => {
  openPopup(avatarPopupElement);
})

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

      closePopup(cardPopupElement);
    })
    .catch(console.log)
    .finally(() => {
      toggleLoading(cardFormElement, false, 'Создать')
    })
});

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  toggleLoading(profileFormElement, true);

  editProfile({
    name: profileFormElement.elements.name.value,
    about: profileFormElement.elements.description.value
  })
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      closePopup(profilePopupElement);
    })
    .catch(console.log)
    .finally(() => {
      toggleLoading(profileFormElement, false)
    })
});

avatarFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  toggleLoading(avatarFormElement, true);

  editAvatar(avatarFormElement.elements.link.value)
    .then(data => {
      profileAvatar.src = data.avatar

      closePopup(avatarPopupElement);
    })
    .catch(console.log)
    .finally(() => {
      toggleLoading(avatarFormElement, false)
    })
});

deleteFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  toggleLoading(deleteFormElement, true);

  const cardId = storage.getItem('cardId');

  deleteCard(cardId)
    .then(data => {
      document
        .querySelector(`.pics__pic[data-id="${cardId}"]`)
        .closest('li')
        .remove()

      closePopup(deletePopupElement);
    })
    .catch(console.log)
    .finally(() => {
      toggleLoading(deleteFormElement, false, 'Да');
    })
})

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
