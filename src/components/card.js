// Темплейт карточки
const cardTemplete = document.querySelector("#card-template").content;

// Элементы DOM
const modalImage = document.querySelector(".popup__image");
const cardPopup = document.querySelector(".popup_type_image");
const closeCardPopupButton = document.querySelector(
  ".popup_type_image .popup__close"
);
const modalImageCaptoion = document.querySelector(".popup__caption");

// Функция создания карточки
const createCard = (card, deleteCard, openModal) => {
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);
  
  setCardImage(cardElement, card);
  setCardTitle(cardElement, card);

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeIcon = cardElement.querySelector(".card__like-button");
  const cardImage = selectCardImage(cardElement);

  cardElement.addEventListener("click", (event) => {
    if (event.target === cardDeleteButton) {
      deleteCard(cardElement);
    } else if (event.target === likeIcon) {
      likeCard(likeIcon);
    } else if (event.target === cardImage) {
      setModalImage(cardElement);
      setModalCaption(cardElement);
      openModal(cardPopup, closeCardPopupButton);
    }
  });

  return cardElement;
};

const selectCardImage = (cardElement) => cardElement.querySelector(".card__image");
const selectCardTitle = (cardElement) => cardElement.querySelector(".card__title");

const setCardImage = (cardElement, card) => {
  const cardImage = selectCardImage(cardElement);
  cardImage.src = card.link;
  cardImage.alt = card.name;
};

const setCardTitle = (cardElement, card) => {
  const cardTitle = selectCardTitle(cardElement);
  cardTitle.textContent = card.name;
};

const setModalImage = (cardElement) => {
  const cardImage = selectCardImage(cardElement);
  modalImage.src = cardImage.src;
};

const setModalCaption = (cardElement) => {
  const cardTitle = selectCardTitle(cardElement);
  modalImageCaptoion.textContent = cardTitle.textContent;
};

const likeCard = (likeIcon) => {
  likeIcon.classList.toggle('card__like-button_is-active');
};

export { createCard };
