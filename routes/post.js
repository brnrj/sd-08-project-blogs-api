const express = require('express');

const app = express();

const { createPost, getPosts, getPostById } = require('../controllers/post');

const { validateContent, hasCategoryIds,  
    } = require('../helpers/helpers');

    const validateJWT = require('../helpers/validateJWT');

app.post('/', validateJWT, validateContent, hasCategoryIds, createPost);
app.get('/', validateJWT, getPosts);
app.get('/:id', validateJWT, getPostById);

module.exports = app;