import { initialCards, renderCard } from "./card.js";
import { profileName, profileDescription, closePopup, openPopup } from "./utils.js";
import { popups, openProfileEditPopup} from "./modal.js";
import { cardFormElement, profileFormElement } from "./forms.js";

const { cardPopupElement, picturePopupElement, profilePopupElement } = popups

initialCards.forEach(renderCard);

document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardPopupElement);
})

cardFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  renderCard({
    name: cardFormElement.elements.name.value,
    link: cardFormElement.elements.link.value
  });

  cardFormElement.reset();

  closePopup(cardPopupElement);
});

document.querySelector('.profile__edit').addEventListener('click', () => {
  openProfileEditPopup();
});

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = profileFormElement.elements.name.value;
  profileDescription.textContent = profileFormElement.elements.description.value;

  closePopup(profilePopupElement);
});

Array.from(Object.values(popups)).forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  })
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    Array.from(Object.values(popups)).forEach(popup => {
      closePopup(popup)
    })
  }
});
