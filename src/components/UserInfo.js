export default class UserInfo {
  #name
  #about
  #setCallback
  #getCallback

  constructor({ nameSelector, aboutSelector, getCallback, setCallback }) {
    this.#name = document.querySelector(nameSelector);
    this.#about = document.querySelector(aboutSelector);
    this.#setCallback = setCallback;
    this.#getCallback = getCallback;
  }

  getUserInfo() {
    return this.#getCallback()
  }

  setUserInfo(info) {
    return this.#setCallback(info)
      .then(data => {
        this.#name.textContent = data.name;
        this.#about.textContent = data.about;
      })
  }
}
