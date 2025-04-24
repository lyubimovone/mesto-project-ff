const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-36',
    headers: {
        authorization: '23912af3-9a44-4d29-9dea-204a160c1e87',
        'Content-Type': 'application/json'
    }
};

function request(url, method, body) {
    const options = {
        method,
        headers: config.headers,
        credentials: 'same-origin',
        body: body ? JSON.stringify(body) : undefined
    };

    return fetch(`${config.baseUrl}${url}`, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return res.json().then(err => {
                err.statusCode = res.status;
                return Promise.reject(err);
            });
        })
        .catch(err => {
            console.error(`API Error: ${err.message || err}`);
            return Promise.reject(err);
        });
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export const getUserInfo = () => request('/users/me', 'GET');

export const getInitialCards = () => request('/cards', 'GET');

export const updateUserInfo = (name, about) => {
    if (!name || !about) {
        return Promise.reject('Name and about are required');
    }
    return request('/users/me', 'PATCH', { name, about });
};

export const addNewCard = (name, link) => {
    if (!name || !link) {
        return Promise.reject('Name and link are required');
    }
    if (!validateUrl(link)) {
        return Promise.reject('Invalid URL format');
    }
    return request('/cards', 'POST', { name, link });
};

export const deleteCard = (cardId) => {
    if (!cardId) {
        return Promise.reject('Card ID is required');
    }
    return request(`/cards/${cardId}`, 'DELETE');
};

export const likeCard = (cardId) => {
    if (!cardId) {
        return Promise.reject('Card ID is required');
    }
    return request(`/cards/likes/${cardId}`, 'PUT');
};

export const unlikeCard = (cardId) => {
    if (!cardId) {
        return Promise.reject('Card ID is required');
    }
    return request(`/cards/likes/${cardId}`, 'DELETE');
};

export const updateAvatar = (avatar) => {
    if (!avatar) {
        return Promise.reject('Avatar URL is required');
    }
    if (!validateUrl(avatar)) {
        return Promise.reject('Invalid avatar URL format');
    }
    return request('/users/me/avatar', 'PATCH', { avatar });
};