const express = require('express');
const { User, BlogPost, Category } = require('../models');
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
    
    /*    categoryIds.forEach((item) => { 
      if (!categoryArray.includes(item)) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
    }); */

    // Peguei a dica de usar for com a Karine, por algum motivo ao usar forEach surgia um erro de headers.
    for (let index = 0; index < categoryIds.length; index += 1) {
      if (!categoryArray.includes(categoryIds[index])) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
    }

    const newPost = await BlogPost.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (err) {
    return res.status(400).json({ message: err.errors[0].message });
  }
});

router.get('/', validateJWT, async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  
    return res.status(200).json(posts);
  } catch (err) {
    console.log('\n\n', err, '\n\n');
    res.status(400).json({ message: err.errors[0].message });
  }
});

module.exports = router;
