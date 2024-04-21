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

// Элементы модального окна редактирования профиля
const profileModal = document.querySelector(".popup_type_edit");
const closeProfileModalButton = document.querySelector(".popup_type_edit .popup__close");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormDescription = document.querySelector(".popup__input_type_description");

// Элементы модального окна добавления карточки
const newCardModal = document.querySelector(".popup_type_new-card");
const closeNewCardModalButton = document.querySelector(".popup_type_new-card .popup__close");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const newCardFormImageName = document.querySelector(".popup__input_type_card-name");
const newCardFormImageUrl = document.querySelector(".popup__input_type_url");

// Элементы модального окна просмотра карточки
const cardModal = document.querySelector(".popup_type_image");
const closeCardModalButton = document.querySelector(".popup_type_image .popup__close");

(function showCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, likeCard);
    cardsList.append(cardElement);
  });
})();

// Слушатель кнопки редактирования профиля
editProfileButton.addEventListener("click", () => {
  setProfileData();
  openModal(profileModal);
});

const setProfileData = () => {
  profileFormName.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

// Слушатели модального окна редактирования профиля
closeProfileModalButton.addEventListener("click", () => closeModal(profileModal));

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
}

// Слушатель кнопки добавления карточки
addCardButton.addEventListener("click", () => openModal(newCardModal));

closeNewCardModalButton.addEventListener("click", () => closeModal(newCardModal));

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
  }
  const cardElement = createCard(card, deleteCard, likeCard);
  cardsList.prepend(cardElement);
}

closeCardModalButton.addEventListener("click", () => closeModal(cardModal));

// Функции работы с формами
const resetForm = (form) => {
  form.reset();
};
