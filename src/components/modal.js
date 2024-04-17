const openModal = (modal, closeButton) => {
    //console.log(modal);
    //console.log(closeButton);
    modal.classList.add('popup_is-opened');
    closeButton.addEventListener("click", () => closeModal(modal, closeButton));
    document.addEventListener("keydown", (event) => {
        console.log(event.key);
        if (event.key === 'Escape') {
            closeModal(modal, closeButton);
        }
    })
};

const closeModal = (modal, closeButton) => {
    //console.log(modal);
    //console.log(closeButton);
    modal.classList.remove('popup_is-opened');
    closeButton.removeEventListener("click", closeModal);
    document.removeEventListener("keydown", closeModal);
};

export { openModal, closeModal };
