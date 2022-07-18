export default class UserInfo {
  #name
  #about
  #setProfileCallback
  #setAvatarCallback
  #getUserCallback
  #avatar

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

  setUserInfo(info) {
    return this.#setProfileCallback(info)
      .then(data => {
        this.#name.textContent = data.name;
        this.#about.textContent = data.about;
      })
  }

  setAvatar(avatar) {
    return this.#setAvatarCallback(avatar)
      .then(data => {
        this.#avatar.src = data.avatar;
      })
  }
}
