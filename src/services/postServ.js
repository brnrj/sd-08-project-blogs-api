const { User, BlogPost } = require('../../models');

// const createCategory = async (name) => {
//   const categoryCreated = await Category.create({ name });
//   return categoryCreated;
// };

const createPost = async (title, content, userId) => {
  const categoryCreated = await BlogPost.create({ title, content, userId });
  return categoryCreated;
};

const checkCategory = async (findAllCategories, categoryIds) => {
  // const isCategoryValidOne = await categoryIds.map((id) =>
  //   Category.findOne({ where: { id } }));

  // console.log('isCategoryValidOne', isCategoryValidOne);
  // return searchEmail !== null;

  const arrayIdCreated = await findAllCategories.map((data) => data.id);
  const isCategoryValid = await categoryIds.some((catIds) => arrayIdCreated.includes(catIds));

  console.log('arrayId', arrayIdCreated);
  console.log('valid', isCategoryValid);
  console.log('categoryIds', categoryIds);

  if (!isCategoryValid) {
    return { message: '"categoryIds" not found' };
  }

  return true;
};

const verifyValidation = (title, content, categoryIds) => {
  if (title === undefined) {
    return { message: '"title" is required' };
  }

  if (content === undefined) {
    return { message: '"content" is required' };
  }

  if (categoryIds === undefined) {
    return { message: '"categoryIds" is required' };
  }

  return true;
};

const filterAllUserByEmail = async (email) => {
  const searchEmail = await User.findOne({ where: { email } });
  return searchEmail;
};

module.exports = {
  checkCategory,
  verifyValidation,
  filterAllUserByEmail,
  createPost,
};
