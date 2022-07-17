export default class Section {
  #items
  #renderer
  #selector
  constructor({ items, renderer }, selector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#selector = document.querySelector(selector)
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
