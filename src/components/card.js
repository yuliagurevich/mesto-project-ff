const cardTemplete = document.querySelector("#card-template").content;

const createCard = (
  card,
  handleDeleteButtonClick,
  handleLikeButtonClick,
  handleImageClick,
  userId
) => {
  const cardElement = cardTemplete.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => handleImageClick(card));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardDeleteButon = cardElement.querySelector(".card__delete-button");

  if (card.owner._id !== userId) {
    removeElement(cardDeleteButon);
  } else {
    cardDeleteButon.addEventListener("click", () => {
      handleDeleteButtonClick(card._id, cardElement);
    });
  }

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesCounter = cardElement.querySelector(".card__like-counter");

  changeLikes(card, userId, cardLikesCounter, cardLikeButton);

  cardLikeButton.addEventListener("click", () => {
    const isLiked = checkIsCardLiked(cardLikeButton);
    handleLikeButtonClick(
      isLiked,
      card,
      userId,
      cardLikesCounter,
      cardLikeButton
    );
  });

  return cardElement;
};

const removeElement = (element) => {
  element.remove();
};

function checkIsCardLiked(cardLikeButton) {
  return cardLikeButton.classList.contains("card__like-button_is-active");
}

function changeLikes(card, userId, cardLikesCounter, cardLikeButton) {
  cardLikesCounter.textContent = card.likes.length;
  if (card.likes.some((user) => user?._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }
}

export { createCard, removeElement as deleteCard, changeLikes };
