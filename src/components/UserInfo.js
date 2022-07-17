export default class UserInfo {
  #name
  #about

  constructor(nameSelector, aboutSelector) {
    this.#name = document.querySelector(nameSelector);
    this.#about = document.querySelector(aboutSelector)
  }
}
