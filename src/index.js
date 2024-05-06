import './pages/index.css'; 
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard } from './components/card.js'
import { enableValidation, validationConfig, clearValidation } from './components/validation.js'
import { updateAvatar, addCardServer, getInfoProfile, updateProfile, loadCards } from './components/api.js'

const placeList = document.querySelector('.places__list');
const openImg = document.querySelector('.popup_type_image');
const openEditButton = document.querySelector('.profile__edit-button');
const editOpenPopup = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
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
const addPopupAvatarButton =  document.querySelector('.profile__image-button');
const addNewAvatar = document.querySelector('.popup_type_new-avatar');
const formAvatar = document.querySelector('[name="new-avatar"]'); 
const avatarlinkInput = formAvatar.querySelector('.popup__input_type_url-avatar');
const saveButtonProfile = formEdit.querySelector('.popup__button');
const saveButtonCard = formPlace.querySelector('.popup__button'); 
const saveButtonAvatar = formAvatar.querySelector('.popup__button'); 

let userId;
let ownerId;
let cardId;
let likes;
let myLikes;

// откртиые модалки профиля
openEditButton.addEventListener('click', function() {
    openModal(editOpenPopup)
    clearValidation(formEdit, validationConfig);
    formElement.querySelector('input[name="name"]').value = nameInputElement.textContent;
    formElement.querySelector('input[name="description"]').value = jobInputElement.textContent;
});

// откртиые модалки карточек
addPopupOpenButton.addEventListener('click', function() {
    openModal(addNewCard)
    clearValidation(formPlace, validationConfig);
});

// открытить попап с аватаром
addPopupAvatarButton.addEventListener('click', function() {
  openModal(addNewAvatar)
  clearValidation(formAvatar, validationConfig);
});

// откртие картинок
function openCardImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(openImg);
}

// кнопка закрытия
closeButtons.forEach(btn => btn.addEventListener("click", closeModal));

// редактирование профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    nameInputElement.textContent = nameInputValue;
    jobInputElement.textContent = jobInputValue;
    closeModal();
}

// редактирование инф на сервере
formEdit.addEventListener('submit',(evt) => {
  handleProfileFormSubmit(evt),
  renderLoading(true);
  updateProfile(nameInput.value, jobInput.value)
  .then((data) => {
    const userName = data.name;
    const userAbout = data.about;
    nameInputElement.textContent = userName;
    jobInputElement.textContent = userAbout;
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false);
  })
});

//добавление карточек
function addNewFormCard(evt) {
  evt.preventDefault();
  formPlace.reset();
  closeModal();
}

formPlace.addEventListener('submit', (evt) => {
  renderLoading(true);
  addCardServer(cardlinkInput.value, cardNameInput.value)
  .then((data) => {
    const nameCard = data.name;
    const linkCard = data.link;
    cardlinkInput.value = linkCard;
    cardNameInput.value = nameCard;
    ownerId = data.owner._id;
    placeList.prepend(createCard(data.link, data.name, deleteCard, openCardImage, userId, ownerId, cardId, likes.lenght, myLikes))
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false);
  }),
  addNewFormCard (evt)
});

// функция для аватара
function handleAvatarFormSubmit(evt, link) {
  evt.preventDefault(); 
  const avatarInputValue = link;
  avatarlinkInput.src = avatarInputValue;
  closeModal();
}

// смена аватара на сервере
formAvatar.addEventListener('submit',(evt) => {
  handleAvatarFormSubmit(evt),
  renderLoading(true);
  updateAvatar(avatarlinkInput.value)
  .then((data) => {
    const userAvatar = data.avatar;
    const avatarElement = document.querySelector('.profile__image');
    avatarElement.style.backgroundImage = `url(${userAvatar})`;
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false);
  })
});

enableValidation(validationConfig);

Promise.all( [ getInfoProfile(), loadCards() ] )
  .then( ( [dataRes, cardRes] ) => {
    const userName = dataRes.name;
    const userAbout = dataRes.about;
    const userAvatar = dataRes.avatar;
    userId = dataRes._id;
    nameInputElement.textContent = userName;
    jobInputElement.textContent = userAbout;
    const avatarElement = document.querySelector('.profile__image');
    avatarElement.style.backgroundImage = `url(${userAvatar})`;

    cardRes.forEach(function(card) {
      ownerId = card.owner._id;
      cardId = card._id;
      likes = card.likes;
      let myLikes = card.likes.some((likeObj) => {
        return likeObj._id === userId
      });
  placeList.append(createCard(card.link, card.name, deleteCard, openCardImage, userId, ownerId, cardId, likes, myLikes));
  });
})
  .catch( (err) => {
    console.log(err);
  });
  

  function renderLoading(isLoading) {
    if (isLoading){
      saveButtonProfile.textContent = "Сохранение...";
      saveButtonCard.textContent = "Сохранение..."; 
      saveButtonAvatar.textContent = "Сохранение...";
    }
    else {
      saveButtonProfile.textContent = "Сохранить";
      saveButtonCard.textContent = "Сохранить"; 
      saveButtonAvatar.textContent = "Сохранить";
    }
  }
