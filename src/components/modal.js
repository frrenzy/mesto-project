import { openPopup } from "./utils";
import { populateProfileForm } from "./forms";
import { popups } from "./constants";

const picturePopupPicture = popups.picturePopupElement.querySelector('.popup__picture');
const picturePopupCaption = popups.picturePopupElement.querySelector('.popup__title');

const openBigPicture = card => {
  picturePopupPicture.src = card.src;
  picturePopupPicture.alt = card.alt;

  picturePopupCaption.textContent = card.alt;

  openPopup(popups.picturePopupElement);
}

const openDeletePopup = () => openPopup(popups.deletePopupElement);

const openProfileEditPopup = () => {
  populateProfileForm();

  openPopup(popups.profilePopupElement);
}

export {
  openBigPicture,
  openProfileEditPopup,
  openDeletePopup
}
