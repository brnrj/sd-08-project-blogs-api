const express = require('express');

const router = express.Router();
const postService = require('../services/PostService');
const middlewareVerifyToken = require('../middleware/verifyToken');

const ALGO_DEU_ERRADO = 'Algo deu errado';

router.post('/', middlewareVerifyToken, async (req, res) => {
  const { userId } = req;

  try {
    const result = await postService.addPost({ ...req.body, userId });
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.get('/', middlewareVerifyToken, async (req, res) => {
  try {
    const result = await postService.getAllPost();
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.get('/:id', middlewareVerifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await postService.getPostById(id);
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.put('/:id', middlewareVerifyToken, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const result = await postService.editPost({ ...req.body, userId, id });
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

router.delete('/:id', middlewareVerifyToken, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const result = await postService.deletePost({ userId, id });
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: ALGO_DEU_ERRADO });
  }
});

module.exports = router;
