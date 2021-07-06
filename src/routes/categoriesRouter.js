const express = require('express');
const middleware = require('../middleware');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', middleware.validateToken, async (_req, res) => {
  await controllers.Categories.findAll(_req, res);
});

router.post('/', middleware.validateToken, middleware.validateCategories, async (req, res) => {
    await controllers.Categories.creates(req, res);
});

module.exports = router;