import { openModal } from './modal.js';

const cardTemplete = document.querySelector("#card-template").content;

const cardModal = document.querySelector(".popup_type_image");
const cardModalImage = document.querySelector(".popup__image");
const cardModalCaptoion = document.querySelector(".popup__caption");

const createCard = (card, deleteCard, likeCard) => {
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);
  setCardImage(cardElement, card);
  setCardTitle(cardElement, card);
  cardElement.addEventListener("click", (event) => {
    if (event.target === selectCardDeleteButton(cardElement)) {
      deleteCard(cardElement);
    } else if (event.target === selectCardLikeIcon(cardElement)) {
      likeCard(cardElement);
    } else if (event.target === selectCardImage(cardElement)) {
      setCardModalImage(cardElement);
      setCardModalCaption(cardElement);
      openModal(cardModal);
    }
  });

  return cardElement;
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const likeCard = (cardElement) => {
  const likeIcon = selectCardLikeIcon(cardElement);
  likeIcon.classList.toggle("card__like-button_is-active");
};

const setCardImage = (cardElement, card) => {
  const cardImage = selectCardImage(cardElement);
  cardImage.src = card.link;
  cardImage.alt = card.name;
};

const setCardTitle = (cardElement, card) => {
  const cardTitle = selectCardTitle(cardElement);
  cardTitle.textContent = card.name;
};

const setCardModalImage = (cardElement) => {
  const cardImage = selectCardImage(cardElement);
  cardModalImage.src = cardImage.src;
};

const setCardModalCaption = (cardElement) => {
  const cardTitle = selectCardTitle(cardElement);
  cardModalCaptoion.textContent = cardTitle.textContent;
};

const selectCardImage = (cardElement) => cardElement.querySelector(".card__image");
const selectCardTitle = (cardElement) => cardElement.querySelector(".card__title");
const selectCardDeleteButton = (cardElement) => cardElement.querySelector(".card__delete-button");
const selectCardLikeIcon = (cardElement) => cardElement.querySelector(".card__like-button");

export { createCard, deleteCard, likeCard };
