const { BlogPost, PostsCategory, User, Category } = require('../models');
const { postValidations, categoriesValidations } = require('../validations');

const createPost = async (email, title, categoryIds, content) => {
  postValidations.titleValidate(title);
  postValidations.categoryIdsValidate(categoryIds);
  postValidations.contentValidate(content);

  categoryIds.forEach(async (categoryId) => {
    const categoryIdFound = await Category.findOne({ where: { id: categoryId } });
    return categoriesValidations.existCategoryValidate(categoryIdFound);
  });

  const user = await User.findOne({ where: { email } });
  const { id } = user;
  const newPost = await BlogPost.create({ title, content, userId: id });
  
  categoryIds.forEach(async (category) => {
    await PostsCategory.create({ postId: newPost.id, categoryId: category });
  });
  return newPost.dataValues;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories' },
      { model: User, as: 'user' },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
};
