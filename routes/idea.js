const express = require('express');
const router = express.Router();

const {
    ideaIndexPage,
    addIdeaForm,
    editIdea,
    deleteIdea,
    editform
} = require('../controllers/idea');

router.get('/', ideaIndexPage);

router.get('/add', addIdeaForm);

router.get('/edit/:id', editIdea);

router.delete('/:id', deleteIdea);

router.post('/', processForm);

router.put('/:id', editForm)