const { StatusCodes: HTTP } = require('http-status-codes');

const { BlogPosts, Categories, PostsCategories, Users } = require('../models');
const { postSchema, tokenValidation } = require('./validation');

const generateError = require('../utils/generateError');

const linkCategories = async (postEntity, categoryIds) => {
  const postId = postEntity.dataValues.id;

  // prettier-ignore
  await Promise.all(
    categoryIds.map((categoryId) => PostsCategories.create({ postId, categoryId })),
  );
};

const createPost = async (post, token) => {
  try {
    const isInvalid = postSchema.validate(post).error;
    const { title, content, categoryIds } = post;
    const { id: userId } = await tokenValidation(token);

    if (isInvalid) {
      throw generateError(isInvalid.details[0].message);
    }

    const categories = await Categories.findAll({ raw: true }).then(
      (response) => response.map((category) => category.id),
    );

    const matchCategories = categoryIds.every((id) => categories.includes(id));

    if (!matchCategories) throw generateError('"categoryIds" not found');

    const createdCategory = await BlogPosts.create({ userId, title, content });
    await linkCategories(createdCategory, categoryIds);

    return { status: HTTP.CREATED, result: createdCategory };
  } catch (err) {
    return err;
  }
};

const mountPostResponse = async (post, postCategories, categoryDescriptions) => {
  const { id, title, content, userId, published, updated } = post;

  const user = await Users.findOne({ where: { id: userId }, raw: true });
  delete user.password;

  const categories = postCategories.reduce(
    (acc, val) => (val.postId === id ? [...acc, val.categoryId] : acc), [],
  ).map((category) => categoryDescriptions.find((element) => element.id === category));

  return Promise.resolve({
    id,
    title,
    content,
    userId,
    published,
    updated,
    user,
    categories,
  });
};

const getPosts = async (token) => {
  try {
    tokenValidation(token);
    const postCategories = await PostsCategories.findAll({ raw: true });
    const categories = await Categories.findAll({ raw: true });
    const responseData = await BlogPosts.findAll({ raw: true });

    const posts = await Promise.all(
      responseData.map((post) => mountPostResponse(post, postCategories, categories)),
    );

    return { status: HTTP.OK, result: posts };
  } catch (err) {
    return err;
  }
};

module.exports = { createPost, getPosts };
