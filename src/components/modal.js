import { openPopup } from "./utils.js";
import { populateProfileForm } from "./forms.js";


const profilePopupElement = document.querySelector('.popup_type_profile');
const cardPopupElement = document.querySelector('.popup_type_card');
const picturePopupElement = document.querySelector('.popup_type_picture');
const avatarPopupElement = document.querySelector('.popup_type_avatar');
const deletePopupElement = document.querySelector('.popup_type_delete');

const popups = {
  profilePopupElement,
  cardPopupElement,
  picturePopupElement,
  avatarPopupElement,
  deletePopupElement
}

const picturePopupPicture = picturePopupElement.querySelector('.popup__picture');
const picturePopupCaption = picturePopupElement.querySelector('.popup__title');

const openBigPicture = card => {
  picturePopupPicture.src = card.src;
  picturePopupPicture.alt = card.alt;

  picturePopupCaption.textContent = card.alt;

  openPopup(picturePopupElement);
}

const openDeletePopup = () => openPopup(deletePopupElement);

const openProfileEditPopup = () => {
  populateProfileForm();

  openPopup(profilePopupElement);
}

export {
  popups,
  openBigPicture,
  openProfileEditPopup,
  openDeletePopup
}
