import Card from "../components/Card";
import api from "../components/Api";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {
  profileName, profileDescription, profileAvatar,
  avatarEditIcon, profileEditButton, newCardButton
} from "../utils/constants";

import './index.css';


let cardsSection;
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__pic',
  getCallback: () => api.getUser(),
  setProfileCallback: info => api.editProfile(info),
  setAvatarCallback: avatar => api.editAvatar(avatar)
})

Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
    localStorage.setItem('profileId', user._id);

    cardsSection = new Section(
      {
        items: cards.reverse(),
        renderer: item => {
          const card = new Card(
            item,
            {
              addLike: id => api.addLike(id),
              deleteLike: id => api.deleteLike(id),
              openPopup: (link, name) => bigPicturePopup.openPopup(link, name),
              deletePopup: () => deletePopup.openPopup()
            },
            '#pic-template'
          );
          return card.createCardMarkup()
        }
      }, '.pics__grid'
    );
    cardsSection.renderAll()
  })
  .catch(console.log);


const bigPicturePopup = new PopupWithImage('.popup_type_picture');
bigPicturePopup.setEventListeners();

const profilePopup = new PopupWithForm(
  '.popup_type_profile',
  formData => {
    profilePopup.toggleLoading(true);

    userInfo.setUserInfo(formData)
      .then(() => {
        profilePopup.closePopup();
        profilePopup.reset()
      })
      .catch(console.log)
      .finally(() => {
        profilePopup.toggleLoading(false)
      })
  },
  () => {
    return {
      name: profileName.textContent,
      about: profileDescription.textContent
    }
  }
);
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_type_avatar', formData => {
  avatarPopup.toggleLoading(true);

  userInfo.setAvatar(formData)
    .then(data => {
      avatarPopup.reset();
      avatarPopup.closePopup();
    })
    .catch(console.log)
    .finally(() => {
      avatarPopup.toggleLoading(false)
    })
});
avatarPopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_type_card', formData => {
  cardPopup.toggleLoading(true);

  api.addCard(formData)
    .then(cardData => {
      const card = cardsSection.createItemMarkup(cardData);
      cardsSection.renderItem(card);

      cardPopup.closePopup();
      cardPopup.reset();
    })
    .catch(console.log)
    .finally(() => {
      cardPopup.toggleLoading(false, 'Создать')
    })
});
cardPopup.setEventListeners();

const deletePopup = new PopupWithForm('.popup_type_delete', formData => {
  deletePopup.toggleLoading(true);
  const cardId = localStorage.getItem('cardId');

  api.deleteCard(cardId)
    .then(data => {
      document
        .querySelector(`.pics__pic[data-id="${cardId}"]`)
        .closest('li')
        .remove()

      deletePopup.closePopup();
    })
    .catch(console.log)
    .finally(() => {
      deletePopup.toggleLoading(false, 'Да');
    })
});
deletePopup.setEventListeners();


newCardButton.addEventListener('click', () => {
  cardPopup.openPopup();
})

profileEditButton.addEventListener('click', () => {
  profilePopup.openPopup();
});

avatarEditIcon.addEventListener('click', () => {
  avatarPopup.openPopup();
})


Array.from(Object.values(document.forms)).forEach(formElement => {
  const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, formElement);
  formValidator.enableValidation();
});
