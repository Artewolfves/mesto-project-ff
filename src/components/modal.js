
export { openModal, closeModal, handleEcsClose, handleOwerlayClose }

// открытие попапа
function openModal(openedPopup) {
    openedPopup.classList.add('popup_is-opened','popup_is-animated');
    document.addEventListener('keydown', handleEcsClose);
    openedPopup.addEventListener('click', handleOwerlayClose);
}

//закртиые попапа
function closeModal() {
    const openPopup = document.querySelector('.popup_is-opened');
    openPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEcsClose);
    openPopup.removeEventListener('click', handleOwerlayClose);
}

function handleEcsClose(evt) {
    const openPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(openPopup);
    }
}

function handleOwerlayClose(evt) {
    if(evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}