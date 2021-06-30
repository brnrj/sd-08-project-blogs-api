const express = require('express');
const postServices = require('../services/postServ');
const statusCode = require('../utils/statuscode');
// const { User } = require('../../models');
const { validJWT } = require('../middlewares/validateJWT');
const { managerCategory } = require('../middlewares/managerCategory');

const router = express.Router();

router.post('/', validJWT, managerCategory, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const findAllCategories = req.categories;
  const { email } = req;

  console.log('req.body post', title, content, categoryIds, email);

  const isPostValid = await postServices
  .verifyValidation(title, content, categoryIds);

  if (isPostValid.message) {
    return res.status(statusCode.code.c400).json(isPostValid);
  }

  const checkCategory = await postServices.checkCategory(findAllCategories, categoryIds);

  if (checkCategory.message) {
    return res.status(statusCode.code.c400).json(checkCategory);
  }

  const { id } = await postServices.filterAllUserByEmail(email);
  console.log('getIdUser', id);

  const createPost = await postServices.createPost(title, content, id);
  console.log('createPost', createPost);

  return res.status(statusCode.code.c201).json(createPost);
});

module.exports = router;
