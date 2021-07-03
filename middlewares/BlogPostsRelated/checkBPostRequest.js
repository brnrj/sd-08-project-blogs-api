const { BAD_REQUEST, NOT_FOUND } = require('../../utils/errors');
const { BlogPosts: BlogPostsModel, Category: CategoryModel } = require('../../models');
const stringyErr = require('../../utils/stringfy');

const { BlogPost: { Register: {
  titleRequired,
  contentRequired,
  categoryIdRequired,
  categoryIdsNotFound } } } = BAD_REQUEST;

const { BlogPost: { postNotFound } } = NOT_FOUND;

const verifyRequestCampExists = async (req, res, next) => {
  try {
    const { title, categoryIds, content } = req.body;
    if (!title) throw new Error(stringyErr(BAD_REQUEST, titleRequired));
    if (!categoryIds) throw new Error(stringyErr(BAD_REQUEST, categoryIdRequired));
    if (!content) throw new Error(stringyErr(BAD_REQUEST, contentRequired));
    next(req, res);
  } catch (e) {
    console.log('Middlewares, BlogPostsRelated, verifyRequestCampExists');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyIfCatIdExists = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    const searchInDb = await CategoryModel.findAll({ where: { id: categoryIds } });
    if (searchInDb.length < 1) throw new Error(stringyErr(BAD_REQUEST, categoryIdsNotFound));
    next();
  } catch (e) {
    console.log('Middlewares, BlogPostsRelated, verifyRequestCampExists');
    console.log(e.message);
    // const errorCore = JSON.parse(e.message);
    // res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyIfPostIdExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchInDb = await BlogPostsModel.findOne({ where: { id } });
    if (searchInDb === null) throw new Error(stringyErr(NOT_FOUND, postNotFound));
    next();
  } catch (e) {
    console.log('Middlewares, BlogPostsRelated, verifyIfPostIdExist');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyBPostsRequestRegister = async (req, res, next) => {
  const checkCatId = async () => verifyIfCatIdExists(req, res, next);
  await verifyRequestCampExists(req, res, checkCatId);
};

module.exports = { verifyBPostsRequestRegister, verifyIfPostIdExist };
