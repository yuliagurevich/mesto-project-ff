const BASE_URL = "https://mesto.nomoreparties.co";
const GROUP_ID = "wff-cohort-12";
const TOKEN = "1d95ddaa-d2ac-40b7-82b5-a2a737556376";

function getUser() {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/users/me`, {
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
}

function editUser(user) {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then(handleResponse);
}

function editUserAvatar(avatarUrl) {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl
    }),
  }).then(handleResponse);
}

function getCards() {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/cards`, {
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
}

function addCard(card) {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(handleResponse);
}

function deleteCard(cardId) {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    }
  }).then(handleResponse);
}

function addCardLike(cardId) {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    }
  }).then(handleResponse);
}

function removeCardLike(cardId) {
  return fetch(`${BASE_URL}/v1/${GROUP_ID}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    }
  }).then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export { getUser, editUser, editUserAvatar, getCards, addCard, deleteCard, addCardLike, removeCardLike };
