const { Router } = require('express');

const PostController = Router();

const { BlogPost, User, PostsCategories, Category } = require('../models');
const { auth, validBlogPost, validCategoryIds } = require('../services');

// const STATUS_400 = 400;
const STATUS_201 = 201;
// const STATUS_200 = 200;

PostController.post('/', auth, validBlogPost, validCategoryIds, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  // console.log('>>', email);
  const user = await User.findOne({ where: { email } });
  // console.log('>>>', user);
   const blogPost = await BlogPost
    .create({ title, content, userId: user.id, published: new Date(), updated: new Date() });
  // console.log('>>>>>', blogPost);
  const allCategories = await Category.findAll();
  const allIds = allCategories.map(({ id }) => id);
  await allIds.forEach((catId) => PostsCategories
    .create({ categoryId: catId, postId: blogPost.id }));
  // for (let i = 0; i < categoryIds.length; i += 1) {
  //   Promise.all(PostsCategories.create({ categoryIds: allIds[i], postId: blogPost.id }));
  // }
  return res.status(STATUS_201).json(blogPost);
});

// PostController.get('/', auth, async (req, res) => {
//   const result = await BlogPost.findAll({
//     include: [
//       { model: User, as: 'user', atributes: { exclude: ['password'] } },
//       { model: Category, as: 'categories' },
//     ],
//   });
//   return res.status(STATUS_200).json(result);
// });

module.exports = PostController;
