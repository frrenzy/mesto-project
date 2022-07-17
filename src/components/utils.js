const toggleLoading = (form, isLoading, text='Сохранить') => {
  form.querySelector('.popup__submit').textContent = isLoading ? 'Сохранение...' : text;
}

export {
  toggleLoading
}
