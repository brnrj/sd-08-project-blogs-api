const express = require('express');
const bodyParser = require('body-parser');
const { Category } = require('../../models');

const app = express();
app.use(bodyParser.json());

// 5 - Sua aplicação deve ter o endpoint POST /categories
const addCategory = async (req, res, next) => {
    const { body } = req;
    const categoryData = await Category.create(body);
    req.categoryData = categoryData;
    next();
};

// 6 - Sua aplicação deve ter o endpoint GET /categories
const findAllCategories = async (req, res, next) => {
  const allCategories = await Category.findAll();
  req.allCategories = allCategories;
  next();
};

module.exports = {
  addCategory,
  findAllCategories,
};