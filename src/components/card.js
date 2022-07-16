import { openBigPicture, openDeletePopup } from "./modal";
import { storage } from "./storage";
import { picsGrid, picTemplate } from "./constants"
import Api from "./Api";


const toggleLike = (like, counter, cardId) => {
  if (like.classList.contains('pics__like_active')) {
    Api.deleteLike(cardId)
      .then(data => {
        like.classList.remove('pics__like_active');
        counter.textContent = data.likes.length;
      })
      .catch(console.log);
  } else {
    Api.addLike(cardId)
      .then(data => {
        like.classList.add('pics__like_active');
        counter.textContent = data.likes.length;
      })
      .catch(console.log);
  }
}

const renderCard = card => {
  const picElement = createCard(card);
  picsGrid.prepend(picElement);
}

const createCard = ({
  name,
  link,
  _id,
  likes,
  owner
}) => {
  const picElement = picTemplate.querySelector('li').cloneNode(true);
  const picElementPicture = picElement.querySelector('.pics__pic');
  const picElementDelete = picElement.querySelector('.pics__delete');
  const picElementLike = picElement.querySelector('.pics__like');
  const picElementLikeCounter = picElement.querySelector('.pics__like-counter');

  picElementPicture.src = link;
  picElementPicture.alt = name;
  picElementPicture.dataset.id = _id;
  picElementLikeCounter.textContent = likes.length;
  picElement.querySelector('.pics__pic-name').textContent = name;

  if (likes.find(item => item._id === storage.getItem('profileId'))) {
    picElementLike.classList.add('pics__like_active')
  }

  if (owner._id !== storage.getItem('profileId')) {
    picElementDelete.classList.add('pics__delete_hidden');
  }

  picElementPicture.addEventListener('click', () => {
    openBigPicture(picElementPicture);
  });

  picElementLike.addEventListener('click', () => {
    toggleLike(picElementLike, picElementLikeCounter, picElementPicture.dataset.id)
  });

  picElementDelete.addEventListener('click', () => {
    storage.setItem('cardId', _id);
    openDeletePopup();
  });

  return picElement;
}

export {
  renderCard
}
