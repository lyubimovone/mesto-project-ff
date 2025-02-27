import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './components/card.js';
import { openModal } from './components/modal.js';

const cardsList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

editButton.addEventListener('click', () => {
    openModal(editPopup);
})

addButton.addEventListener('click', () => {
    openModal(cardPopup);
})

initialCards.forEach((card) => {
    cardsList.append(createCard(card.name, card.link, deleteCard));
});

const formElementEdit = editPopup.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

function handleEditFormSubmit(evt) {
    evt.preventDefault(); 

    const name = document.querySelector('.profile__title');
    const job = document.querySelector('.profile__description');

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

formElementEdit.addEventListener('submit', handleEditFormSubmit);

const formElementCard = cardPopup.querySelector('.popup__form');
const countryInput = formElementCard.querySelector('.popup__input_type_card-name');
const urlInput = formElementCard.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardsList.insertBefore(createCard(countryInput.value, urlInput.value, deleteCard), cardsList.firstChild);
}

formElementCard.addEventListener('submit', handleCardFormSubmit);

console.log(document);
