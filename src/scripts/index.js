import "../pages/index.css";

import initialCards from "./cards";

import { createCard } from "../components/card.js";
import { openModal } from "../components/modal.js";
import { deleteElement } from "../scripts/common.js";

// DOM узлы
const cardsList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const closeEditPopupButton = document.querySelector(
  ".popup_type_edit .popup__close"
);
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const closePopupButtons = document.querySelector(
  ".popup_type_new-card .popup__close"
);

// Вывести карточки на страницу
function showCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteElement, openModal);
    cardsList.append(cardElement);
  });
}

showCards();

editButton.addEventListener("click", () =>
  openModal(editPopup, closeEditPopupButton)
);

newCardButton.addEventListener("click", () =>
  openModal(newCardPopup, closePopupButtons)
);
