const express = require('express');
const bodyParser = require('body-parser');
const {
  tryAddUser,
} = require('../services/userService');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// 1 - Sua aplicação deve ter o endpoint POST /user

router.post('/',
  async (req, res) => {
    const { body } = req;
    const end = await tryAddUser(body, res);
    return end;
  });

module.exports = { router };