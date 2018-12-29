const express = require('express');
const router = express.Router();

const {
    loginPage,
    registerPage
} = require('../controllers/auth');

router.get('/login', loginPage);

router.get('/login', registerPage);