const express = require('express');

const router = express.Router();
const postService = require('../services/PostService');
const middlewareVerifyToken = require('../middleware/verifyToken');

router.post('/', middlewareVerifyToken, async (req, res) => {
  const { userId } = req;

  try {
    const result = await postService.addPost({ ...req.body, userId });
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
