const cardTemplate = document.querySelector('#card-template').content;

export function handleLikeClick(evt) {
    const cardLikeButton = evt.target;
    cardLikeButton.classList.toggle('card__like-button_is-active');
}

export function createCard(cardName, cardLink, deleteHandler, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');

    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;

    cardDeleteButton.addEventListener('click', deleteHandler);

    cardLike.addEventListener('click', handleLikeClick);

    cardImage.addEventListener('click', function() {
        openImagePopup(cardName, cardLink);
    });

    return cardElement;
}

export function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}