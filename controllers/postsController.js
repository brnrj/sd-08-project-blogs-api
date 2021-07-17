const express = require('express');

const { User, BlogPost, Categories } = require('../models');
const { validatePosts, validateCategoryIds, validatePostUpdate } = require('../schema');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user.data;
    const invalid = validatePosts(title, content, categoryIds);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });
    
    const validCatIds = await validateCategoryIds(categoryIds);
    console.log(validCatIds);
    if (validCatIds) return res.status(validCatIds.status).json({ message: validCatIds.message });

    const newPost = await BlogPost
    .create({ userId: id, title, content, published: new Date(), updated: new Date() });
    return res.status(201).json({ id: newPost.id, title, content, userId: newPost.userId });
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', validateJWT, async (req, res) => {
  const blogPosts = await BlogPost
    .findAll({ include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories' }] });
  if (!blogPosts) res.status(401).json({ message: 'Algo deu errado' });

  return res.status(200).json(blogPosts);
});

router.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await BlogPost.findOne({ 
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories' },
      ],
    });

    if (!user) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.put('/:id', validateJWT, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: uId } = req.user.data;
    const { id } = req.params;
    const blogPost = await BlogPost.findOne({ where: { id },
      include: { model: Categories, as: 'categories' },
    });
    if (blogPost.userId !== uId) return res.status(401).json({ message: 'Unauthorized user' });
    const invalid = validatePostUpdate(title, content, categoryIds);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });
    await BlogPost.update({ title, content },
      { where: { id } });
    return res.status(200).json({ title, content, userId: uId, categories: blogPost.categories });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
