export default class UserInfo {
  #name
  #about
  #setProfileCallback
  #setAvatarCallback
  #getUserCallback
  #avatar
  #id

  constructor({ nameSelector, aboutSelector, avatarSelector, getCallback, setProfileCallback, setAvatarCallback }) {
    this.#name = document.querySelector(nameSelector);
    this.#about = document.querySelector(aboutSelector);
    this.#avatar = document.querySelector(avatarSelector);
    this.#setProfileCallback = setProfileCallback;
    this.#getUserCallback = getCallback;
    this.#setAvatarCallback  = setAvatarCallback;
  }

  getUserInfo() {
    return this.#getUserCallback()
  }

  updateUserInfo(info) {
    return this.#setProfileCallback(info)
      .then(this.render)
  }

  updateAvatar(avatar) {
    return this.#setAvatarCallback(avatar)
      .then(this.render)
  }

  render({ name, about, avatar, _id }) {
    this.#name.textContent = name;
    this.#about.textContent = about;
    this.#avatar.src = avatar;
    this.#id = _id;
  }

  getId() {
    return this.#id;
  }

  getFormValues() {
    return {
      name: this.#name.textContent,
      about: this.#about.textContent
    }
  }
}
