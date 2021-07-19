const throwError = (err, statusCode, message = '') => {
  const error = err;
  if (error.isJoi) {
    error.statusCode = statusCode;
    throw error;
  }
  error.statusCode = statusCode;
  error.message = message;
  throw error;
};

const categoryExists = async (ids, categoryModel) => {
  const categories = Promise.all(ids.map(async (id) => {
    const item = await categoryModel.findOne({ where: { id } });
    if (item) return item.dataValues;
    return null;
  }));
  return categories;
};

const postCategory = async (postId, postCategoryModel, categoriesIds) => {
  Promise.all(categoriesIds.forEach(async ({ id }) => {
    await postCategoryModel.create({ postId, categoryId: id });
  }));
};

module.exports = {
  throwError,
  categoryExists,
  postCategory,
};
