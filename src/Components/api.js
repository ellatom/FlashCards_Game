import axios from 'axios';

const instance = 
    axios.create({ baseURL: 'https://5f63d2bf363f0000162d9181.mockapi.io'});

async function getCards() {
    return (await instance.get('/cards')).data;
}

async function getCard(id) {
    return (await instance.get(`/cards/${id}`)).data;
}

async function createCard(card) {
    await instance.post(`/cards`, card);
}

async function updateCard(card) {
    await instance.put(`/cards/${card.id}`, card);
}

async function deleteCard(id) {
    await instance.delete(`/cards/${id}`);
}

export default {
    getCards,
    getCard,
    createCard,
    updateCard,
    deleteCard,
};
