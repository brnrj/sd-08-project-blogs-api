const express = require('express');
const categoriesServices = require('../services/categoriesServices');

const { validateName } = require('../middlewares/categoriesValidation');

const { validationToken } = require('../auth/validateJWT');

const { status } = require('../schema/status');

const routes = express.Router();

routes.post('/', validateName, validationToken, async (req, res) => {
  try {
    const { name } = req.body;
    const createdCategory = await categoriesServices.createCategory(name);
    return res.status(status.created).json(createdCategory);
  } catch (err) {
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

module.exports = routes;
