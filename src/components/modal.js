export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated'); 
    document.addEventListener('keydown', closePopupEsc);
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
    closeByOverlay(popup)
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

function closeByOverlay (popup) {
    popup.addEventListener('click', (event) => {
        event.stopPropagation();
        if (event.target === popup) {
            closeModal(popup);
        } 
    });
}