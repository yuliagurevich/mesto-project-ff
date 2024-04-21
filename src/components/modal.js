const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithKey);
  modal.addEventListener("click", closeOnOverlayClick);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithKey);
  modal.removeEventListener("click", closeOnOverlayClick);
};

function closeWithKey(event) {
  if (event.key === "Escape") {
    closeModal(selectCurrentOpenModal());
  }
}

const selectCurrentOpenModal = () => document.querySelector(".popup_is-opened");

function closeOnOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal(event.currentTarget);
  }
}

export { openModal, closeModal };
