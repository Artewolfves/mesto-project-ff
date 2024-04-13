export {createCard, deleteCard }

function createCard(linkValue, nameValue, deleteCard, openCardImage ) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImg.src = linkValue;
    cardImg.alt = nameValue;
    cardTitle.textContent = nameValue;


    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
    // лайк карточки
    const likeButton = cardElement.querySelector('.card__like-button');

    likeButton.addEventListener('click', likeCard);

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

function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active')
};
