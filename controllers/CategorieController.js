const express = require('express');

const router = express.Router();
const categorieService = require('../services/CategoriesService');
const middlewareVerifyToken = require('../middleware/verifyToken');

router.post('/', middlewareVerifyToken, async (req, res) => {
  try {
    const result = await categorieService.addCategorie(req.body);
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;