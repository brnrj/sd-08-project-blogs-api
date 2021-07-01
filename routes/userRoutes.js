const express = require('express');

const userRoutes = express.Router();
userRoutes.use(express.json());
const { createUser } = require('../controllers/UserControllers');

userRoutes.post('/', createUser);

module.exports = userRoutes;
