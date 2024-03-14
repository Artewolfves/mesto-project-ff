const placeList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

function createCard(linkValue, nameValue, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = nameValue;
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));  
    return cardElement;
};

function deleteCard (el) {
    el.remove();
};

initialCards.forEach(function(card) {
    placeList.append(createCard(card.link, card.name, deleteCard));
});
