export const openBigPicture = card => {
  picturePopupPicture.src = card.src;
  picturePopupPicture.alt = card.alt;

  picturePopupCaption.textContent = card.alt;

  openPopup(picturePopupElement);
}
