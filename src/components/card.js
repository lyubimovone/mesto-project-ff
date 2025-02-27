import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardName, cardLink, deleteHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;


    cardDeleteButton.addEventListener('click', deleteHandler);

    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');

    cardLike.addEventListener('click', () => {
        cardLike.classList.add('card__like-button_is-active')
    });
    cardImage.addEventListener('click', () => {
        const popup = document.querySelector('.popup_type_image');
        openModal(popup);
        const img = popup.querySelector('.popup__image');
        const text = popup.querySelector('.popup__caption');
        text.textContent = cardName;
        img.src = cardLink;
    })

    return cardElement;
}

export function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}