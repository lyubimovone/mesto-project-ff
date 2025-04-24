export function initModal(popup) {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('mousedown', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.popup');
    modals.forEach(modal => initModal(modal));
});