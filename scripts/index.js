// @todo: Темплейт карточки
const cardTemplete = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places");

// @todo: Функция создания карточки
function createCardElement(card, deleteCard) {    
    const cardElement = cardTemplete.querySelector(".card").cloneNode(true);
  
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
  
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = card.name;
  
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", deleteCard);
  
    return cardElement;
  }

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
function showCards() {
  initialCards.forEach(card => {
    const cardElement = createCardElement(card, deleteCard);
    cardsList.append(cardElement);
  });
}

showCards();
