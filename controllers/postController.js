const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { addPost,
  findAllPosts } = require('../services/midlewares/postService');
const {
  CREATED,
  OK,
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

// 8 - Sua aplicação deve ter o endpoint GET /post
router.get('/',
rescue(decodeToken),
rescue(findAllPosts),
(req, res) => {
  const { allPosts } = req;
  return res.status(OK).json(allPosts);
});

module.exports = { router };