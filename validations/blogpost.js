const error = require('./err');

const titleRequired = {
  code: error.code.BAD_REQ,
  message: error.message.TITLE_REQUIRED,
};

const contentRequired = {
  code: error.code.BAD_REQ,
  message: error.message.CONTENT_REQUIRED,
};

const catIdRequired = {
  code: error.code.BAD_REQ,
  message: error.message.CAT_ID_REQUIRED,
};

const catIdNotFound = {
  code: error.code.BAD_REQ,
  message: error.message.CAT_ID_NOT_FOUND,
};

const postDoesntExist = {
  code: error.code.NOT_FOUND,
  message: error.message.POST_DOESNT_EXIST,
};

const titleVerify = (title) => {
  if (!title) throw new Error(JSON.stringify(titleRequired));
};

const contentVerify = (content) => {
  if (!content) throw new Error(JSON.stringify(contentRequired));
};

const categoryIdVerify = (categoryId) => {
  if (!categoryId) throw new Error(JSON.stringify(catIdRequired));
};

const verifyBodyRequest = ({ title, content, categoryIds }) => {
  titleVerify(title);
  contentVerify(content);
  categoryIdVerify(categoryIds);
};

const categoriesExists = (categories) => {
  if (categories.length < 1) throw new Error(JSON.stringify(catIdNotFound));
};

const blogExists = (blog) => {
  if (!blog) throw new Error(JSON.stringify(postDoesntExist));
};

module.exports = {
  verifyBodyRequest,
  categoriesExists,
  blogExists,
};