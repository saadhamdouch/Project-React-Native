const express = require('express');

const {findMessages, find10By10Messages} = require('../Controllers/MessageController');

const Messagerouter = express.Router();

Messagerouter.get('/', findMessages);
Messagerouter.get('/pagination', find10By10Messages);

module.exports = {Messagerouter};