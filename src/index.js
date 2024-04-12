import './pages/index.css'; 
import { initialCards } from './components/cards.js'
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard } from './components/card.js'

export { cardTemplate }

const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const openImg = document.querySelector('.popup_type_image');
const openEditButton = document.querySelector('.profile__edit-button');
const editOpenPopup = document.querySelector('.popup_type_edit');
const closeButton = document.querySelectorAll('.popup__close');
const addPopupOpenButton =  document.querySelector('.profile__add-button');
const addNewCard = document.querySelector('.popup_type_new-card');
const formElement = document.querySelector('.popup__form');
const formEdit = document.querySelector('[name="edit-profile"]'); 
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
const nameInputElement = document.querySelector('.profile__title');
const jobInputElement = document.querySelector('.profile__description');
const formPlace = document.querySelector('[name="new-place"]'); 
const cardNameInput = formPlace.querySelector('.popup__input_type_card-name');
const cardlinkInput = formPlace.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

initialCards.forEach(function(card) {
    placeList.append(createCard(card.link, card.name, deleteCard, openCardImage));
});

openEditButton.addEventListener('click', function() {
    openModal(editOpenPopup)
    formElement.querySelector('input[name="name"]').value = nameInputElement.textContent;
    formElement.querySelector('input[name="description"]').value = jobInputElement.textContent;
});

addPopupOpenButton.addEventListener('click', function() {
    openModal(addNewCard)
});

closeButton.forEach(btn => btn.addEventListener("click", closeModal));

function openCardImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(openImg);
}

// редактирование профиля

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    nameInputElement.textContent = nameInputValue;
    jobInputElement.textContent = jobInputValue;
    //отчистка форм
    
    formEdit.value = formEdit.reset();
    closeModal();
}

formEdit.addEventListener('submit', handleFormSubmit);

function addNewFormCard(evt) {
    evt.preventDefault();
    const newCardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const newCardImg = newCardElement.querySelector('.card__image');
    const newCardTitle = newCardElement.querySelector('.card__title');
    newCardTitle.textContent = cardNameInput.value;
    newCardImg.src = cardlinkInput.value; 
    placeList.prepend(createCard(newCardImg.src, newCardTitle.textContent, deleteCard, openCardImage));
    formPlace.reset();
    closeModal();
}

formPlace.addEventListener('submit', addNewFormCard);
