const placeList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

function addCard(linkValue, nameValue, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__title').textContent = nameValue;
    placeList.append(cardElement);

    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
};

function deleteCard (el) {
    el.remove();
};

initialCards.forEach(function(card) {
    addCard(card.link, card.name, deleteCard)
});
