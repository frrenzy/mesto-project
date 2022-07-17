export default class Section {
  #items
  #renderer
  #selector
  constructor({ items, renderer }, selector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#selector = document.querySelector(selector)
  }
}
