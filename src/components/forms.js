import {
  nameInputElement, descriptionInputElement,
  profileDescription, profileName
} from "./constants";


const populateProfileForm = () => {
  nameInputElement.value = profileName.textContent;
  descriptionInputElement.value = profileDescription.textContent;
}

export {
  populateProfileForm
}
