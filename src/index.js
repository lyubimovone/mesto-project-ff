import './pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
    getUserInfo,
    getInitialCards,
    updateUserInfo,
    addNewCard,
    deleteCard,
    likeCard,
    unlikeCard,
    updateAvatar
} from './components/api.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const elements = {
    profileName: document.querySelector('.profile__title'),
    profileDescription: document.querySelector('.profile__description'),
    profileAvatar: document.querySelector('.profile__image'),
    cardsList: document.querySelector('.places__list'),
    editButton: document.querySelector('.profile__edit-button'),
    addButton: document.querySelector('.profile__add-button'),
    avatarEditButton: document.querySelector('.profile__image-overlay'),
    editPopup: document.querySelector('.popup_type_edit'),
    cardPopup: document.querySelector('.popup_type_new-card'),
    avatarPopup: document.querySelector('.popup_type_avatar'),
    imagePopup: document.querySelector('.popup_type_image'),
    editForm: document.querySelector('.popup__form_edit-profile'),
    cardForm: document.querySelector('.popup__form_new-card'),
    avatarForm: document.querySelector('.popup__form_avatar')
};

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = elements.editForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    updateUserInfo(
        elements.editForm.elements.name.value,
        elements.editForm.elements.about.value
    )
        .then((userData) => {
            elements.profileName.textContent = userData.name;
            elements.profileDescription.textContent = userData.about;
            closeModal(elements.editPopup);
        })
        .catch(console.error)
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
};

const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = elements.cardForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    addNewCard(
        elements.cardForm.elements['place-name'].value,
        elements.cardForm.elements.link.value
    )
        .then((newCard) => {
            const cardHandlers = {
                handleDeleteClick: (cardId, cardElement) => {
                    deleteCard(cardId)
                        .then(() => cardElement.remove())
                        .catch(console.error);
                },
                handleLikeClick: (cardId, likeButton, likeCounter) => {
                    const method = likeButton.classList.contains('card__like-button_is-active')
                        ? unlikeCard
                        : likeCard;
                    method(cardId)
                        .then((card) => {
                            likeCounter.textContent = card.likes.length;
                            likeButton.classList.toggle('card__like-button_is-active');
                        })
                        .catch(console.error);
                },
                handleImageClick: (name, link) => {
                    elements.imagePopup.querySelector('.popup__image').src = link;
                    elements.imagePopup.querySelector('.popup__image').alt = name;
                    elements.imagePopup.querySelector('.popup__caption').textContent = name;
                    openModal(elements.imagePopup);
                }
            };
            elements.cardsList.prepend(createCard(newCard, newCard.owner._id, cardHandlers));
            elements.cardForm.reset();
            closeModal(elements.cardPopup);
        })
        .catch(console.error)
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
};

const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = elements.avatarForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    updateAvatar(elements.avatarForm.elements.avatar.value)
        .then((userData) => {
            elements.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(elements.avatarPopup);
        })
        .catch(console.error)
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
};

const init = () => {
    enableValidation(validationConfig);

    Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cards]) => {
            elements.profileName.textContent = userData.name;
            elements.profileDescription.textContent = userData.about;
            elements.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

            const cardHandlers = {
                handleDeleteClick: (cardId, cardElement) => {
                    deleteCard(cardId)
                        .then(() => cardElement.remove())
                        .catch(console.error);
                },
                handleLikeClick: (cardId, likeButton, likeCounter) => {
                    const method = likeButton.classList.contains('card__like-button_is-active')
                        ? unlikeCard
                        : likeCard;
                    method(cardId)
                        .then((card) => {
                            likeCounter.textContent = card.likes.length;
                            likeButton.classList.toggle('card__like-button_is-active');
                        })
                        .catch(console.error);
                },
                handleImageClick: (name, link) => {
                    elements.imagePopup.querySelector('.popup__image').src = link;
                    elements.imagePopup.querySelector('.popup__image').alt = name;
                    elements.imagePopup.querySelector('.popup__caption').textContent = name;
                    openModal(elements.imagePopup);
                }
            };

            cards.forEach(card => {
                elements.cardsList.append(createCard(card, userData._id, cardHandlers));
            });
        })
        .catch(console.error);

    elements.editButton.addEventListener('click', () => {
        elements.editForm.elements.name.value = elements.profileName.textContent;
        elements.editForm.elements.about.value = elements.profileDescription.textContent;
        clearValidation(elements.editForm, validationConfig);
        openModal(elements.editPopup);
    });

    elements.addButton.addEventListener('click', () => {
        elements.cardForm.reset();
        clearValidation(elements.cardForm, validationConfig);
        openModal(elements.cardPopup);
    });

    elements.avatarEditButton.addEventListener('click', () => {
        elements.avatarForm.reset();
        clearValidation(elements.avatarForm, validationConfig);
        openModal(elements.avatarPopup);
    });

    elements.editForm.addEventListener('submit', handleProfileFormSubmit);
    elements.cardForm.addEventListener('submit', handleAddCardFormSubmit);
    elements.avatarForm.addEventListener('submit', handleAvatarFormSubmit);
};

document.addEventListener('DOMContentLoaded', init);