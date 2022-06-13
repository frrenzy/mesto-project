import { initialCards, renderCard } from "./card.js";
import { profileName, profileDescription, closePopup, openPopup } from "./utils.js";
import { cardPopupElement, profilePopupElement, openProfileEditPopup} from "./modal.js";
import { cardFormElement, profileFormElement } from "./forms.js";


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
