const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  OK,
} = require('../services/consts');
const { loginValidations } = require('../services/validations');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// 2 - Sua aplicação deve ter o endpoint POST /login

router.post('/',
rescue(loginValidations),
async (req, res) => {
  const { token } = req;
  return res.status(OK).json({ token });
});

module.exports = { router };