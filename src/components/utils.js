const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const closePopup = popup => popup.classList.remove('popup_opened');
const openPopup = popup => popup.classList.add('popup_opened');

export {
  profileName,
  profileDescription,
  closePopup,
  openPopup
}
