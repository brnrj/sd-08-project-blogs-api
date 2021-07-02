const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { addPost } = require('../services/midlewares/postService');
const {
  CREATED,
} = require('../services/consts');
const { fieldsValidation } = require('../services/midlewares/postValidations');
const { decodeToken } = require('../services/midlewares/jwt');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// 1 - Sua aplicação deve ter o endpoint POST /user

router.post('/',
rescue(decodeToken),
rescue(fieldsValidation),
rescue(addPost),
(req, res) => {
  const { postData } = req;
  return res.status(CREATED).json(postData);
});

module.exports = { router };