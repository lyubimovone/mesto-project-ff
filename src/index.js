import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const cardsList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

const formElementEdit = editPopup.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

const formElementCard = cardPopup.querySelector('.popup__form');
const countryInput = formElementCard.querySelector('.popup__input_type_card-name');
const urlInput = formElementCard.querySelector('.popup__input_type_url');

const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const imagePopupCaptionElement = document.querySelector('.popup__caption');

function fillProfilePopup() {
    nameInput.value = userNameElement.textContent;
    jobInput.value = userJobElement.textContent;
}

function handleEditFormSubmit(evt) {
    evt.preventDefault(); 
    userNameElement.textContent = nameInput.value;
    userJobElement.textContent = jobInput.value;
    closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardsList.insertBefore(createCard(countryInput.value, urlInput.value, deleteCard, openImagePopup), cardsList.firstChild);
    closeModal(cardPopup);
    formElementCard.reset();
}

function openImagePopup(cardName, cardLink) {
    openModal(popupImage);
    imagePopupCaptionElement.textContent = cardName;
    imageElement.src = cardLink;
    imageElement.alt = cardName;
} 

formElementEdit.addEventListener('submit', handleEditFormSubmit);
formElementCard.addEventListener('submit', handleCardFormSubmit);

editButton.addEventListener('click', () => {
    fillProfilePopup();
    openModal(editPopup);
})

addButton.addEventListener('click', () => {
    openModal(cardPopup);
})

initialCards.forEach((card) => {
    cardsList.append(createCard(card.name, card.link, deleteCard, openImagePopup));
});

console.log(document);