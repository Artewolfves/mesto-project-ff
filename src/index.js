import './pages/index.css'; 
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard } from './components/card.js'
import { enableValidation, clearValidation } from './components/validation.js'
import { updateAvatar, addCardServer, getInfoProfile, updateProfile, loadCards } from './components/api.js'

const placeList = document.querySelector('.places__list');
const popupImageOpened = document.querySelector('.popup_type_image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditOpen = document.querySelector('.popup_type_edit');
const buttonAddCard  =  document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const formPopup = document.querySelector('.popup__form');
const formEdit = document.querySelector('[name="edit-profile"]'); 
const nameInput = formEdit.querySelector('.popup__input_type_name');
const descriptionInput = formEdit.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const formPlace = document.querySelector('[name="new-place"]'); 
const cardNameInput = formPlace.querySelector('.popup__input_type_card-name');
const cardlinkInput = formPlace.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const addPopupAvatarButton =  document.querySelector('.profile__image-button');
const popupAddNewAvatar = document.querySelector('.popup_type_new-avatar');
const formAvatar = document.querySelector('[name="new-avatar"]'); 
const avatarlinkInput = formAvatar.querySelector('.popup__input_type_url-avatar');
const avatarElement = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;

popups.forEach(item => item.classList.add('popup_is-animated'));

// откртиые модалки профиля
buttonEditProfile.addEventListener('click', function() {
    openModal(popupEditOpen)
    clearValidation(formEdit, validationConfig);
    formPopup.querySelector('input[name="name"]').value = nameProfile.textContent;
    formPopup.querySelector('input[name="description"]').value = descriptionProfile.textContent;
});

// открытие модалки карточек
buttonAddCard.addEventListener('click', function() {
    cardNameInput.value = "";
    cardlinkInput.value = ""; 
    openModal(popupAddNewCard)
    clearValidation(formPlace, validationConfig);
});

// открытить попап с аватаром
addPopupAvatarButton.addEventListener('click', function() {
  avatarlinkInput.value = "";
  openModal(popupAddNewAvatar)
  clearValidation(formAvatar, validationConfig);
});

// откртие картинок
function openCardImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupImageOpened);
}

// редактирование инф на сервере
formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  changeTextSubmitButton(evt)
  updateProfile(nameInput.value, descriptionInput.value)
  .then((data) => {
    const userName = data.name;
    const userAbout = data.about;
    nameProfile.textContent = userName;
    descriptionProfile.textContent = userAbout;
    console.log(data)
    closeModal(popupEditOpen); 
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    changeTextSubmitButton(evt)
  })

});

formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  changeTextSubmitButton(evt)
  addCardServer(cardlinkInput.value, cardNameInput.value)
  .then((data) => {
    placeList.prepend(createCard(data.link, data.name, deleteCard, openCardImage, userId, data.owner._id, data._id, data.likes))
    console.log(data);
    formPlace.reset();
    closeModal(popupAddNewCard);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    changeTextSubmitButton(evt)
  })
});

// смена аватара на сервере
formAvatar.addEventListener('submit',(evt) => {
  evt.preventDefault();
  // handleAvatarFormSubmit(evt),
  changeTextSubmitButton(evt)
  updateAvatar(avatarlinkInput.value)
  .then((data) => {
    const userAvatar = data.avatar;
    avatarElement.style.backgroundImage = `url(${userAvatar})`;
    console.log(data)
    closeModal(popupAddNewAvatar);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    changeTextSubmitButton(evt)
  })
});

enableValidation(validationConfig);

Promise.all( [ getInfoProfile(), loadCards() ] )
  .then( ( [dataRes, cardRes] ) => {
    const userName = dataRes.name;
    const userAbout = dataRes.about;
    const userAvatar = dataRes.avatar;
    userId = dataRes._id;
    nameProfile.textContent = userName;
    descriptionProfile.textContent = userAbout;
    avatarElement.style.backgroundImage = `url(${userAvatar})`;

    cardRes.forEach(function(card) {
  placeList.append(createCard(card.link, card.name, deleteCard, openCardImage, userId, card.owner._id, card._id, card.likes));
  });
})
  .catch( (err) => {
    console.log(err);
});

function changeTextSubmitButton(evt) {
    const textLoading = evt.target.querySelector('.popup__button_text-loading');
    const initialText = evt.target.querySelector('.popup__button_text');
    textLoading.classList.toggle('popup_button_text-is-visible');
    initialText.classList.toggle('popup_button_text-is-visible');
}