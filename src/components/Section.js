export default class Section {
  #items
  #renderer
  #container

  constructor({ items, renderer }, selector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(selector)
  }

  renderItem(element) {
    this.#container.prepend(element)
  }

  renderAll() {
    this.#items.forEach(item => {
      const element = this.createItemMarkup(item);
      this.renderItem(element)
    })
  }

  createItemMarkup(item) {
    return this.#renderer(item)
  }
}
