const express = require('express');
const { checkToken, checkCat, validFilds } = require('../service/validateBlogpost');
 
const validateJWT = require('../service/validateJWT');

const router = express.Router();

const { User, Categories, BlogPosts } = require('../models');
// codigo de resposta em algarismos romanos
const cc = 200;
const cci = 201;
// const z = 0;
// const cdxxii = 422;
// const cd = 400;
// const cdi = 401;
// const cdiv = 404;
// const cdix = 409;
// const d = 500;

router.post('/', validFilds, checkCat, checkToken, async (req, res) => {
 try {
   const post = await BlogPosts.create(req.body);
   const { id, title, content, userId } = post; 
   return res.status(cci).json({ id, userId, title, content });
 } catch (e) {
  res.status(e).json({ e });
 }
}); 

router.get('/', validateJWT, async (req, res) => {
 try {
   const all = await BlogPosts.findAll({ 
     include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
     ], 
    });
   console.log('all:', all);
   return res.status(cc).json(all);
 } catch (e) {
   res.status(e).json(e);
 }
});

module.exports = router;