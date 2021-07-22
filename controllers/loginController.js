const express = require('express');

const router = express.Router();
const loginController = router();
const jwt = require('jsonwebtoken');

const jwtConfig = require('../services/jwtConfig');
const env = require('dotenv').config();
const { status, message } = require('../services/statusMessages');

// const loginService = require('../services/loginService');

module.exports = loginController;