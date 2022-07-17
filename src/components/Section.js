export default class Section {
  #items
  #renderer
  #container

  constructor({ items, renderer }, selector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(selector)
  }

  addItem(element) {
    this.#container.prepend(element)
  }

  render() {
    this.#items.forEach(item => {
      const element = this.#renderer(item);
      this.addItem(element)
    })
  }
}
