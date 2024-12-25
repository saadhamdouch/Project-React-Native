const express = require('express');

const { createClient, findAllUsers, find10By10Users } = require('../Controllers/ClientController');

const Clientrouter = express.Router();

Clientrouter.post('/create', createClient);
Clientrouter.get('/', findAllUsers);
Clientrouter.get('/pagination', find10By10Users);

module.exports = {Clientrouter};