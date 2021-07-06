const express = require('express');
const authenticator = require('../middlewares/authenticator');
const postValidation = require('../middlewares/postValidation');
const { BlogPosts, Users, Categories } = require('../models');

const router = express.Router();

const CREATED = 201;
const OK = 200;

router.post('/', authenticator, postValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.id;
  const post = await BlogPosts.create({ title, content, categoryIds, userId });
  res.status(CREATED).json(post);
});

router.get('/', authenticator, async (_req, res) => {
    // const posts = await PostsCategories.findAll({
    //   include: [
    //     // { model: Users, as: 'user' },
    //     { model: Categories },
    //     // { model: BlogPosts, include: [{ model: Users, as: 'user' }] },
    //     { model: Users, as: 'user', through: BlogPosts },
    //   ],
    // });
    const posts = await BlogPosts.findAll({
      include: [{ model: Categories, as: 'categories' }, { model: Users, as: 'user' }],
    });
    // const posts = await BlogPosts.findAll({
    //   include: [
    //     { model: Users, as: 'user' },
    //     { model: PostsCategories, include: [{ model: Categories }] },
    //   ],
    // });
    // console.log({ posts, categories: posts.PostsCategories.categories });

    return res.status(OK).json(posts);
});

module.exports = router;