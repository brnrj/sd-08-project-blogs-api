const { PostsCategory: PostsCategoryModel } = require('../models');

const createNewPostCategory = async (name) => {
  try {
    const creatingPCategory = await PostsCategoryModel.create({ name });
    return creatingPCategory;
  } catch (e) {
    console.log(e.message, 'PostsCategoryServices, createNewPostCategory');
    return e.message;
  }
};

module.exports = { createNewPostCategory };
