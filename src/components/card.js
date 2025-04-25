import { deleteCard, likeCard, unlikeCard } from './api.js';

export function handleDeleteClick(cardId, cardElement) {
    return deleteCard(cardId)
        .then(() => cardElement.remove())
        .catch(console.error);
}

export function handleLikeClick(cardId, likeButton, likeCounter) {
    const method = likeButton.classList.contains('card__like-button_is-active')
        ? unlikeCard
        : likeCard;
    return method(cardId)
        .then((card) => {
            likeCounter.textContent = card.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch(console.error);
}

export function createCard(cardData, currentUserId, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    if (cardData.owner._id !== currentUserId) {
        deleteButton.remove();
    }

    if (cardData.likes.some(like => like._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    deleteButton.addEventListener('click', () => {
        handleDeleteClick(cardData._id, cardElement);
    });

    likeButton.addEventListener('click', () => {
        handleLikeClick(cardData._id, likeButton, likeCounter);
    });

    cardImage.addEventListener('click', () => {
        handleImageClick(cardData.name, cardData.link);
    });

    return cardElement;
}