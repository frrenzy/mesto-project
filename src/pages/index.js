import Card from "../components/Card";
import api from "../components/Api";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import { closePopup, openPopup, toggleLoading } from "../components/utils";
import {
  profileName, profileDescription, profileAvatar, avatarEditIcon,
  forms, popups
} from "../components/constants";
import { openProfileEditPopup } from "../components/modal";
import { storage } from "../components/storage";

import './index.css';


const { cardPopupElement, profilePopupElement, avatarPopupElement, deletePopupElement } = popups;
const { avatarFormElement, cardFormElement, profileFormElement, deleteFormElement } = forms;

let cardsSection;

Promise.all([api.getUser(), api.getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
    storage.setItem('profileId', user._id);

    cardsSection = new Section(
      {
        items: cards.reverse(),
        renderer: item => {
          const card = new Card(
            item,
            {
              addLike: id => api.addLike(id),
              deleteLike: id => api.deleteLike(id)
            },
            '#pic-template'
          );
          return card.createCardMarkup()
        }
      }, '.pics__grid'
    );
    cardsSection.render()
  })
  .catch(console.log);


document.querySelector('.profile__add').addEventListener('click', () => {
  openPopup(cardPopupElement);
})

document.querySelector('.profile__edit').addEventListener('click', openProfileEditPopup);

avatarEditIcon.addEventListener('click', () => {
  openPopup(avatarPopupElement);
})

cardFormElement.addEventListener('submit', () => {
  toggleLoading(cardFormElement, true);

  api.addCard({
    name: cardFormElement.elements.name.value,
    link: cardFormElement.elements.link.value
  })
    .then(cardData => {
      const card = new Card(
        cardData,
        {
          addLike: id => api.addLike(id),
          deleteLike: id => api.deleteLike(id)
        },
        '#pic-template'
      );
      cardsSection.addItem(card.createCardMarkup());
      cardFormElement.reset();

      closePopup(cardPopupElement);
    })
    .catch(console.log)
    .finally(() => {
      toggleLoading(cardFormElement, false, 'Создать')
    })
});

profileFormElement.addEventListener('submit', () => {
  toggleLoading(profileFormElement, true);

  api.editProfile({
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

avatarFormElement.addEventListener('submit', () => {
  toggleLoading(avatarFormElement, true);

  api.editAvatar(avatarFormElement.elements.link.value)
    .then(data => {
      profileAvatar.src = data.avatar

      closePopup(avatarPopupElement);
    })
    .catch(console.log)
    .finally(() => {
      toggleLoading(avatarFormElement, false)
    })
});

deleteFormElement.addEventListener('submit', () => {
  toggleLoading(deleteFormElement, true);

  const cardId = storage.getItem('cardId');

  api.deleteCard(cardId)
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

});


Array.from(Object.values(forms)).forEach(formElement => {
  const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, formElement);
  formValidator.enableValidation();
});
