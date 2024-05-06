export {createCard, deleteCard }
import { likeCardServer, unLikeCardServer, deleteCardServer } from './api.js'

function createCard(linkValue, nameValue, deleteCard, openCardImage, userId, ownerId, cardId, likes, myLikes) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImg.src = linkValue;
    cardImg.alt = nameValue;
    cardTitle.textContent = nameValue;
    if (userId === ownerId) {
        cardDeleteButton.style.display = 'inline-block';
        cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
        cardDeleteButton.addEventListener('click', () => deleteCardServer(cardId));
    }
    else {
        cardDeleteButton.style.display = 'none'
    }

    // лайк карточки
    const likeButton = cardElement.querySelector('.card__like-button');
    if (myLikes) likeButton.classList.toggle('card__like-button_is-active')
    let likeCount = cardElement.querySelector('.like-count');
    likeCount.textContent = likes ? likes.length : 0;
    likeButton.addEventListener('click', (evt) => handleLikeClick(evt, cardId, likeCount));

    // открытие карточки
cardImg.addEventListener('click', () => {
    openCardImage(cardImg.src, cardTitle.textContent)
});

return cardElement;
};

// функция удаление карточки
function deleteCard (el) {
    el.remove();
};

// функция лайка карточки
function handleLikeClick(evt, cardId, likeCount) {
    if(!evt.target.classList.contains('card__like-button_is-active')) {
        likeCardServer(cardId)
        .then((result) => {
            likeCount.textContent = result.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        unLikeCardServer(cardId)
        .then((result) => {
            likeCount.textContent = result.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(err);
        })
    }
}