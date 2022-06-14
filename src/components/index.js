import { initialCards, renderCard } from "./card.js";
import { profileName, profileDescription, closePopup, openPopup } from "./utils.js";
import { popups, openProfileEditPopup} from "./modal.js";
import { cardFormElement, profileFormElement } from "./forms.js";
import { enableValidation } from "./validate.js";

import '../pages/index.css';


const { cardPopupElement, picturePopupElement, profilePopupElement } = popups

initialCards.forEach(renderCard);

document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardPopupElement);
})

document.querySelector('.profile__edit').addEventListener('click', () => {
  openProfileEditPopup();
});

cardFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  renderCard({
    name: cardFormElement.elements.name.value,
    link: cardFormElement.elements.link.value
  });

  cardFormElement.reset();

  closePopup(cardPopupElement);
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
