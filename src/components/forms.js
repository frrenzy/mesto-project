import { profileDescription, profileName } from "./utils.js";

const profileFormElement = document.forms.edit;
const cardFormElement = document.forms.add;
const avatarFormElement = document.forms.avatar;

const nameInputElement = profileFormElement.elements.name;
const descriptionInputElement = profileFormElement.elements.description;


const populateProfileForm = () => {
  nameInputElement.value = profileName.textContent;
  descriptionInputElement.value = profileDescription.textContent;
}

export {
  profileFormElement,
  cardFormElement,
  avatarFormElement,
  populateProfileForm
}
