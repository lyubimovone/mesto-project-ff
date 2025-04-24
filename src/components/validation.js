const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    }
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
    }
};

const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage || "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const toggleButtonState = (inputList, buttonElement, config) => {
    const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
    buttonElement.disabled = hasInvalidInput;
    buttonElement.classList.toggle(config.inactiveButtonClass, hasInvalidInput);
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => evt.preventDefault());
        setEventListeners(formElement, config);
    });
}

export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
        inputElement.setCustomValidity("");
    });

    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
}