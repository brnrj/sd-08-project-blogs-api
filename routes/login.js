const router = require('express').Router();
const { login } = require('../controllers');

router.route('/')
  .get()
  .post(login)
  .put()
  .delete();

module.exports = router;
