class Api {
  #baseUrl
  #headers

  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  static #onFulfilled(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Error: ${res.status}`)
  }

  getUser() {
    return fetch(`${this.#baseUrl}/users/me`, {
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  getCards() {
    return fetch(`${this.#baseUrl}/cards`, {
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  editProfile(info) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(info),
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  addCard(card) {
    return fetch(`${this.#baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify(card),
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  deleteCard(cardId) {
    return fetch(`${this.#baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  addLike(cardId) {
    return fetch(`${this.#baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  deleteLike(cardId) {
    return fetch(`${this.#baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }


  editAvatar(avatar) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(avatar),
      headers: this.#headers
    })
      .then(Api.#onFulfilled)
  }
}

export default new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
  headers: {
    authorization: '0347b600-c1ce-41de-a88e-cd44ae7745f0',
    'Content-Type': 'application/json'
  }
});
