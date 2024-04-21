const cardTemplete = document.querySelector("#card-template").content;

const createCard = (card, deleteCard, likeCard, handleImageClick) => {
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => handleImageClick(cardElement));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardDeleteButon = cardElement.querySelector(".card__delete-button");
  cardDeleteButon.addEventListener("click", () => deleteCard(cardElement));

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", likeCard);

  return cardElement;
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

function likeCard(event) {
  const likeIcon = event.target;
  likeIcon.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
