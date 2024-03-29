const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__pic');
const avatarEditIcon = document.querySelector('.profile__edit-avatar');

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

const toggleLoading = (form, isLoading, text='Сохранить') => {
  form.querySelector('.popup__submit').textContent = isLoading ? 'Сохранение...' : text;
}

export {
  profileName,
  profileDescription,
  profileAvatar,
  avatarEditIcon,
  closePopup,
  openPopup,
  toggleLoading
}
