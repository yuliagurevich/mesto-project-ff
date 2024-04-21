import "../pages/index.css";

import initialCards from "./cards";

import { createCard, deleteCard, likeCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";

// Элементы главной страницы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");

// Общие элементы модальных окон
const closeModalButtons = document.querySelectorAll(".popup__close");

// Элементы модального окна редактирования профиля
const profileModal = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const profileFormName = profileForm.elements["name"];
const profileFormDescription = profileForm.elements["description"];

// Элементы модального окна добавления карточки
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const newCardFormImageName = newCardForm.elements["place-name"];
const newCardFormImageUrl = newCardForm.elements["link"];

// Элементы модального окна просмотра карточки
const cardModal = document.querySelector(".popup_type_image");
const cardModalImage = document.querySelector(".popup__image");
const cardModalCaptoion = document.querySelector(".popup__caption");

(function showCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(
      card,
      deleteCard,
      likeCard,
      handleImageClick
    );
    cardsList.append(cardElement);
  });
})();

function handleImageClick(cardElement) {
  const cardImage = cardElement.querySelector(".card__image");
  cardModalImage.src = cardImage.src;

  const cardTitle = cardElement.querySelector(".card__title");
  cardModalCaptoion.textContent = cardTitle.textContent;

  openModal(cardModal);
}

// Слушатель кнопки редактирования профиля
editProfileButton.addEventListener("click", () => {
  setProfileData();
  openModal(profileModal);
});

const setProfileData = () => {
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
};

// Слушатель отправки данных формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(event) {
  event.preventDefault();
  submitProfileForm();
  resetForm(profileForm);
  closeModal(profileModal);
}

const submitProfileForm = () => {
  profileTitle.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
};

// Слушатель кнопки добавления карточки
addCardButton.addEventListener("click", () => openModal(newCardModal));

newCardForm.addEventListener("submit", handleNewCardFormSubmit);

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  submitNewCardForm();
  resetForm(newCardForm);
  closeModal(newCardModal);
}

const submitNewCardForm = () => {
  const card = {
    name: newCardFormImageName.value,
    link: newCardFormImageUrl.value,
  };
  const cardElement = createCard(card, deleteCard, likeCard, handleImageClick);
  cardsList.prepend(cardElement);
};

closeModalButtons.forEach((closeButton) => {
  const modal = closeButton.closest(".popup");
  closeButton.addEventListener("click", () => closeModal(modal));
});

// Функции работы с формами
const resetForm = (form) => {
  form.reset();
};
