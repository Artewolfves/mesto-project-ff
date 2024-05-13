
export { openModal, closeModal, handleEcsClose, handleOwerlayClose }

// открытие попапа
function openModal(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', handleOwerlayClose);
    document.addEventListener('keydown', handleEcsClose);
}

//закртиые попапа
function closeModal(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('click', handleOwerlayClose);
    document.removeEventListener('keydown', handleEcsClose);
}

function handleOwerlayClose(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) 
    closeModal(evt.currentTarget);
}

function handleEcsClose(evt) {
    if (evt.key === 'Escape')
    closeModal(document.querySelector('.popup_is-opened'));
};