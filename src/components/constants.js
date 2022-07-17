//Card
export const picsGrid = document.querySelector('.pics__grid');

//utils
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__pic');
export const avatarEditIcon = document.querySelector('.profile__edit-avatar');

//forms
const profileFormElement = document.forms.edit;
const cardFormElement = document.forms.add;
const avatarFormElement = document.forms.avatar;
const deleteFormElement = document.forms.delete;
export const forms = {
  profileFormElement,
  cardFormElement,
  avatarFormElement,
  deleteFormElement
}

export const nameInputElement = profileFormElement.elements.name;
export const descriptionInputElement = profileFormElement.elements.description;

//modal
const profilePopupElement = document.querySelector('.popup_type_profile');
const cardPopupElement = document.querySelector('.popup_type_card');
const picturePopupElement = document.querySelector('.popup_type_picture');
const avatarPopupElement = document.querySelector('.popup_type_avatar');
const deletePopupElement = document.querySelector('.popup_type_delete');
export const popups = {
  profilePopupElement,
  cardPopupElement,
  picturePopupElement,
  avatarPopupElement,
  deletePopupElement,
}
