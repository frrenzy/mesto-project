const config = {
  baseURL: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
  fetchConfig: {
    headers: {
      authorization: '0347b600-c1ce-41de-a88e-cd44ae7745f0',
      'Content-Type': 'application/json'
    }
  }
}

const onFulfilled = res => {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Error: ${res.status}`)
};

export const getUser = () => {

  return fetch(`${config.baseURL}/users/me`, config.fetchConfig)
    .then(onFulfilled)
}

export const getCards = () => {
  return fetch(`${config.baseURL}/cards`, config.fetchConfig)
    .then(onFulfilled)
}

export const editProfile = (info) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(info),
    ...config.fetchConfig
  })
    .then(onFulfilled)
}

export const addCard = (card) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    body: JSON.stringify(card),
    ...config.fetchConfig
  })
    .then(onFulfilled)
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    ...config.fetchConfig
  })
    .then(onFulfilled)
}

export const addLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    ...config.fetchConfig
  })
    .then(onFulfilled)
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    ...config.fetchConfig
  })
    .then(onFulfilled)
}

export const editAvatar = (avatar) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({avatar}),
    ...config.fetchConfig
  })
    .then(onFulfilled)
}
