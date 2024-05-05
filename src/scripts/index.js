import "../pages/index.css";

import { createCard, deleteCard, changeLikes } from "../components/card";
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
const buttonOpenProfileModal = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector(".places__list");
const buttonOpenCardModal = document.querySelector(".profile__add-button");

// Общие элементы модальных окон
const buttonsCloseModals = document.querySelectorAll(".popup__close");

// Элементы модального окна редактирования профиля
const profileModal = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements["name"];
const descriptionInput = profileForm.elements["description"];

// Элементы модального окна редактирования аватара пользователя
const avatarModal = document.querySelector(".popup_type_edit-avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.elements["link"];

// Элементы модального окна добавления карточки
const cardModal = document.querySelector(".popup_type_new-card");
const cardForm = document.forms["new-place"];
const placeInput = cardForm.elements["place-name"];
const linkInput = cardForm.elements["link"];

// Элементы модального окна удаления карточки
const deleteModal = document.querySelector(".popup_type_delete-card");
const buttonSubmitDeleteCardRequest = document.querySelector(
  ".delete-card-submit-button"
);

// Элементы модального окна просмотра карточки
const imageModal = document.querySelector(".popup_type_image");
const modalImage = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функции
function handleDeleteButtonClick(cardId, cardElement) {
  deleteModal.cardId = cardId;
  deleteModal.cardElement = cardElement;
  openModal(deleteModal);
}

function handleLikeButtonClick(
  isLiked,
  card,
  userId,
  cardLikesCounter,
  cardLikeButton
) {
  if (!isLiked) {
    addCardLike(card._id)
      .then((card) => {
        changeLikes(card, userId, cardLikesCounter, cardLikeButton);
      })
      .catch((error) => console.log(error));
  } else {
    removeCardLike(card._id)
      .then((card) => {
        changeLikes(card, userId, cardLikesCounter, cardLikeButton);
      })
      .catch((error) => console.log(error));
  }
}

function handleImageClick(card) {
  modalImage.src = card.link;
  modalImage.alt = card.name;
  changeElementTextContent(imageCaption, card.name);
  openModal(imageModal);
}

function changeElementTextContent(element, text) {
  element.textContent = text;
}

const resetForm = (form) => {
  form.reset();
};

// Слушатели
profileImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

buttonOpenProfileModal.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

buttonOpenCardModal.addEventListener("click", () => {
  resetForm(cardForm);
  clearValidation(cardForm, validationConfig);
  openModal(cardModal);
});

avatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const avatarUrl = avatarInput.value;
  const submitButton = avatarModal.querySelector(".popup__button");
  changeElementTextContent(submitButton, "Сохранение...");
  editUserAvatar(avatarUrl)
    .then((user) => {
      profileImage.style = `background-image: url(${user.avatar})`;
      resetForm(avatarForm);
      closeModal(avatarModal);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      changeElementTextContent(submitButton, "Сохранить");
    });
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = {
    name: nameInput.value,
    about: descriptionInput.value,
  };
  const submitButton = profileModal.querySelector(".popup__button");
  changeElementTextContent(submitButton, "Сохранение...");
  editUser(user)
    .then((user) => {
      changeElementTextContent(profileTitle, user.name);
      changeElementTextContent(profileDescription, user.about);
      resetForm(profileForm);
      closeModal(profileModal);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      changeElementTextContent(submitButton, "Сохранить");
    });
});

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const submitButton = cardModal.querySelector(".popup__button");
  changeElementTextContent(submitButton, "Сохранение...");
  addCard(card)
    .then((card) => {
      const cardElement = createCard(
        card,
        handleDeleteButtonClick,
        handleLikeButtonClick,
        handleImageClick,
        card.owner._id
      );
      cardsList.prepend(cardElement);
      resetForm(cardForm);
      closeModal(cardModal);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      changeElementTextContent(submitButton, "Сохранить");
    });
});

buttonSubmitDeleteCardRequest.addEventListener("click", () => {
  const cardId = deleteModal.cardId;
  const cardElement = deleteModal.cardElement;
  const submitButton = deleteModal.querySelector(".popup__button");
  changeElementTextContent(submitButton, "Удаление...");
  deleteCardRequest(cardId)
    .then(() => {
      deleteCard(cardElement);
      closeModal(deleteModal);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      changeElementTextContent(submitButton, "Да");
    })
});

buttonsCloseModals.forEach((closeButton) => {
  const modal = closeButton.closest(".popup");
  closeButton.addEventListener("click", () => closeModal(modal));
});

// Функции и циклы, стартующие во время загрузки страницы
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileImage.style = `background-image: url(${user.avatar})`;
    changeElementTextContent(profileTitle, user.name);
    changeElementTextContent(profileDescription, user.about);

    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        handleDeleteButtonClick,
        handleLikeButtonClick,
        handleImageClick,
        user._id
      );
      cardsList.append(cardElement);
    });
  })
  .catch((error) => console.log(error));

enableValidation(validationConfig);
