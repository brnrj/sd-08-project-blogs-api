const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  addCategory,
  findAllCategories,
} = require('../services/midlewares/categoriesService');
const {
  CREATED,
  OK,
} = require('../services/consts');
const { fieldValidation } = require('../services/midlewares/categoriesValidations');
const { decodeToken } = require('../services/midlewares/jwt');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// 5 - Sua aplicação deve ter o endpoint POST /categories
router.post('/',
rescue(decodeToken),
rescue(fieldValidation),
rescue(addCategory),
(req, res) => {
  const { categoryData } = req;
  return res.status(CREATED).json(categoryData);
});

// 6 - Sua aplicação deve ter o endpoint GET /categories
router.get('/',
rescue(decodeToken),
rescue(findAllCategories),
(req, res) => {
  const { allCategories } = req;
  return res.status(OK).json(allCategories);
});

module.exports = { router };