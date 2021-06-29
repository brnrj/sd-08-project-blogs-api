const express = require('express');
const categoryServices = require('../services/categoriesServ');
const statusCode = require('../utils/statuscode');
// const { User } = require('../../models');
const { validJWT } = require('../middlewares/validateJWT');
const { injectUser } = require('../middlewares/injectUser');

const router = express.Router();

router.post('/', validJWT, injectUser, async (req, res) => {
  const { name } = req.body;
  console.log('req.body categories line 10', name);

  const isCategoryValid = await categoryServices
    .verifyValidation(name);

  if (isCategoryValid.message) {
    return res.status(statusCode.code.c400).json(isCategoryValid);
  } 

  const createCategory = await categoryServices.createCategory(name);
  console.log('createCategory', createCategory);

   return res.status(statusCode.code.c201).json(createCategory);
});

module.exports = router;