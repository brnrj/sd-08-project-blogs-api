const express = require('express');
const bodyParser = require('body-parser');
const { BlogPost, User, Category } = require('../../models');

const app = express();
app.use(bodyParser.json());

// 7 - Sua aplicação deve ter o endpoint POST /post
const addPost = async (req, res, next) => {
  const { body, user } = req;
  const tratededPost = {
    userId: user.id,
    title: body.title,
    content: body.content,
  };
  const postData = await BlogPost.create(tratededPost);
  // Creio que aqui eu deveria povoar a tabela PostCategory tambeḿ
  req.postData = postData;
  next();
};

// 8 - Sua aplicação deve ter o endpoint GET /post
const findAllPosts = async (req, res, next) => {
  const allPosts = await BlogPost.findAll({
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
  });
  req.allPosts = allPosts;
  next();
};

module.exports = {
  addPost,
  findAllPosts,
};