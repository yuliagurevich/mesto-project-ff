// @todo: Темплейт карточки
const cardTemplete = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCardElement(card, deleteCard) {    
    const cardElement = cardTemplete.querySelector(".card").cloneNode(true);
  
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
    cardImage.alt = card.name;
  
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = card.name;
  
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", deleteCard);
  
    return cardElement;
  }

// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
function showCards() {
  initialCards.forEach(card => {
    const cardElement = createCardElement(card, event => deleteElement(event.target.parentElement));
    cardsList.append(cardElement);
  });
}

showCards();
