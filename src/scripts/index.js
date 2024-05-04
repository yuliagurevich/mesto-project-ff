import "../pages/index.css";

import { createCard, deleteCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { enableValidation, clearValidation } from "./validation";

import {
  getUser,
  getCards,
  editUser,
  editUserAvatar,
  addCard,
  deleteCard as deleteCardRequest,
  addCardLike,
  removeCardLike,
} from "./api";

// Элементы главной страницы
const profileImage = document.querySelector(".profile__image");
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

// Элементы модального окна редактирования аватара пользователя
const avatarModal = document.querySelector(".popup_type_edit-avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarFormImageUrl = avatarForm.elements["link"];

// Элементы модального окна добавления карточки
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const newCardFormImageName = newCardForm.elements["place-name"];
const newCardFormImageUrl = newCardForm.elements["link"];

// Элементы модального окна удаления карточки
const deleteCardModal = document.querySelector(".popup_type_delete-card");
const deleteCardSubmitButton = document.querySelector(
  ".delete-card-submit-button"
);

// Элементы модального окна просмотра карточки
const cardModal = document.querySelector(".popup_type_image");
const cardModalImage = document.querySelector(".popup__image");
const cardModalCaptoion = document.querySelector(".popup__caption");

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileImage.style = `background-image: url(${user.avatar})`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;

    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        handleDeleteCardButtonClick,
        addCardLike,
        removeCardLike,
        handleImageClick,
        user._id
      );
      cardsList.append(cardElement);
    });
  })
  .catch((error) => console.log(error));

function handleDeleteCardButtonClick(cardId, cardElement) {
  deleteCardModal.cardId = cardId;
  deleteCardModal.cardElement = cardElement;
  openModal(deleteCardModal);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

profileImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  submitAvatarForm();
}

function submitAvatarForm() {
  const avatarUrl = avatarFormImageUrl.value;
  renderLoading(true, avatarModal);
  editUserAvatar(avatarUrl)
    .then((user) => {
      profileImage.style = `background-image: url(${user.avatar})`;
      resetForm(avatarForm);
      closeModal(avatarModal);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      renderLoading(false, avatarModal);
    });
}

function handleImageClick(cardElement) {
  const cardImage = cardElement.querySelector(".card__image");
  cardModalImage.src = cardImage.src;
  cardModalImage.alt = cardImage.alt;

  const cardTitle = cardElement.querySelector(".card__title");
  cardModalCaptoion.textContent = cardTitle.textContent;

  openModal(cardModal);
}

// Слушатель кнопки редактирования профиля
editProfileButton.addEventListener("click", () => {
  setProfileData();
  clearValidation(profileForm, validationConfig);
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
}

const submitProfileForm = () => {
  renderLoading(true, profileModal);
  editUser({
    name: profileFormName.value,
    about: profileFormDescription.value,
  })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      renderLoading(false, profileModal);
    });
  resetForm(profileForm);
  closeModal(profileModal);
};

// Слушатель кнопки добавления карточки
addCardButton.addEventListener("click", () => {
  resetForm(newCardForm);
  clearValidation(newCardForm, validationConfig);
  openModal(newCardModal);
});

newCardForm.addEventListener("submit", handleNewCardFormSubmit);

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  submitNewCardForm();
}

const submitNewCardForm = () => {
  const card = {
    name: newCardFormImageName.value,
    link: newCardFormImageUrl.value,
  };
  renderLoading(true, newCardModal);
  addCard(card)
    .then((card) => {
      const cardElement = createCard(
        card,
        handleDeleteCardButtonClick,
        addCardLike,
        removeCardLike,
        handleImageClick,
        card.owner._id
      );
      cardsList.prepend(cardElement);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      renderLoading(false, newCardModal);
    });
  resetForm(newCardForm);
  closeModal(newCardModal);
};

deleteCardSubmitButton.addEventListener("click", handleCardDeleteSubmit);

function handleCardDeleteSubmit() {
  const cardId = deleteCardModal.cardId;
  const cardElement = deleteCardModal.cardElement;
  deleteCard(
    cardId,
    cardElement,
    deleteCardRequest,
    closeModal,
    deleteCardModal
  );
}

closeModalButtons.forEach((closeButton) => {
  const modal = closeButton.closest(".popup");
  closeButton.addEventListener("click", () => closeModal(modal));
});

function renderLoading(isLoading, modal) {
  const modalButton = modal.querySelector(".popup__button");
  if (isLoading) {
    modalButton.textContent = "Сохранение...";
  } else {
    modalButton.textContent = "Сохранить";
  }
}

// Функции работы с формами
const resetForm = (form) => {
  form.reset();
};
