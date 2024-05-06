
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
        authorization: 'da241d74-7116-42d8-8868-fb635edca537',
        'Content-Type': 'application/json'
    }
}

function response(res){
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка профиля
export const getInfoProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'GET',   
    })
    .then(response)
}

// Загрузка карточек с сервера
export const loadCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'GET'
    })
    .then(response)
}

 // функция удаления карточки
export const deleteCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE'
    })
    .then(response)
    .catch((err) => {
        console.log(err)
    })
}

// замена аватара
export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then(response)
}

// добавление новой картинки
export const addCardServer = (link, name) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            link: link,
            name: name
        })
    })
    .then(response)
}

// добавление лайка
export const likeCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(response)
}

// удаление лайка
export const unLikeCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(response)
}

// Редактирование профиля
export const updateProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(response)
}