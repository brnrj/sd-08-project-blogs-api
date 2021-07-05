const express = require('express');
const middleware = require('../middleware');
const controllers = require('../controllers');

const router = express.Router();

router.get('/:id', middleware.validateToken, async (req, res) => {
  console.log('Pesquisando ID');
  await controllers.user.findById(req, res);
});
router.get('/', middleware.validateToken, async (_req, res) => {
  await controllers.user.findAll(_req, res);
});

router.post('/', middleware.validateNewUser, async (req, res) => {
    await controllers.user.createsUser(req, res);
});

module.exports = router;