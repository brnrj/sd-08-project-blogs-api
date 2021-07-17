const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
const PostVerify = require('../services/utils/postSchema');
const PostService = require('../services/Post');

const post = rescue(async (req, res, next) => {
    const { error } = PostVerify.validate(req.body);
   if (error) next(error);
     const { id, userId, title, content } = await PostService.post(req.body, req.user.email);
         res.status(201).json({ id, userId, title, content });
});

const findAll = rescue(async (req, res) => {
    const allPost = await PostService.findAll();
    res.status(200).json(allPost);
});
module.exports = { post, findAll };