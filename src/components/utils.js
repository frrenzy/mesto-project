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
  closePopup,
  openPopup,
  toggleLoading
}
