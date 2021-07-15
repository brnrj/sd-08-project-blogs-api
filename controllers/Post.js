const express = require('express');
const { BlogPost, Category } = require('../models');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = req.user;

    if (categoryIds === undefined) {
      return res.status(400).json({ message: '"categoryIds" is required' });
    }

    const categoryList = await Category.findAll();
    const categoryArray = categoryList.map((item) => item.id);

    categoryIds.forEach((item) => { 
      if (!categoryArray.includes(item)) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
    });

    const newPost = await BlogPost.create({ title, content, userId });
    return res.status(201).json(newPost);
  } catch (err) {
    // console.log('\n\n', err, '\n\n');
    return res.status(400).json({ message: err.errors[0].message });
  }
});

router.get('/', validateJWT, async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
  
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    // res.status(400).json({ message: err.errors[0].message });
  }
});

module.exports = router;
