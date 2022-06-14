const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const setEscapeListener = evt => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

const closePopup = popup => {
  document.removeEventListener('keydown', setEscapeListener)
  popup.classList.remove('popup_opened');
}

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscapeListener)
}

export {
  profileName,
  profileDescription,
  closePopup,
  openPopup
}
