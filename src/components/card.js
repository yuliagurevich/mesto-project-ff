const cardTemplete = document.querySelector("#card-template").content;

const createCard = (
  card,
  handleDeleteCardButtonClick,
  addCardLike,
  removeCardLike,
  handleImageClick,
  userId
) => {
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => handleImageClick(cardElement));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardDeleteButon = cardElement.querySelector(".card__delete-button");

  if (card.owner._id !== userId) {
    removeElement(cardDeleteButon);
  } else {
    cardDeleteButon.addEventListener("click", () => {
      handleDeleteCardButtonClick(card._id, cardElement);
    });
  }

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikes = cardElement.querySelector(".card__like-counter");

  card.likes.forEach((like) => {
    if (like?._id === userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  cardLikes.textContent = card.likes.length;

  cardLikeButton.addEventListener("click", () => {
    toggleCardLike(
      card._id,
      cardLikeButton,
      cardLikes,
      addCardLike,
      removeCardLike
    );
  });

  return cardElement;
};

const removeElement = (element) => {
  element.remove();
};

function toggleCardLike(
  cardId,
  cardLikeButton,
  cardLikes,
  addCardLike,
  removeCardLike
) {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    addCardLike(cardId)
      .then((card) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikes.textContent = card.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    removeCardLike(cardId)
      .then((card) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikes.textContent = card.likes.length;
      })
      .catch((error) => console.log(error));
  }
}

function deleteCard(
  cardId,
  cardElement,
  deleteCardRequest,
  closeModal,
  deleteCardModal
) {
  deleteCardRequest(cardId)
    .then(() => {
      removeElement(cardElement);
      closeModal(deleteCardModal);
    })
    .catch((error) => console.log(error));
}

export { createCard, deleteCard };
