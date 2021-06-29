const express = require('express');
const bodyParser = require('body-parser');
const { generateToken } = require('./jwt');

const app = express();
app.use(bodyParser.json());

// 1 - Crie um endpoint para o cadastro de usuários
const login = async (req, res, next) => {
    const { body } = req;
    const token = generateToken(body);
    req.token = token;
    next();
};

module.exports = {
  login,
};