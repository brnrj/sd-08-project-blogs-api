const { Category, BlogPost, User } = require('../models');

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const formatData = (posts, users, rawCategories) => {
  const formatted = posts.map((post) => {
    const { categoryIds, ...info } = post;
    const user = users.find((userEl) => userEl.id === post.userId);
    const categoriesIdsRaw = JSON.parse(categoryIds);
    const categories = rawCategories.filter(
      (category) => categoriesIdsRaw.includes(category.id),
    );

    return {
      ...info,
      user,
      categories,
    };
  });

  return formatted;
};

const GetPostsMiddleware = async (req, res) => {
  const categories = await getCategories();
  const users = await getUsers();
  const posts = await BlogPost.findAll();

  const data = formatData(posts, users, categories);

  return res.status(200).json(data);
};

module.exports = GetPostsMiddleware;