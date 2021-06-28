const router = require('express').Router();
const { validationToken } = require('../middlewares');
const { 
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
} = require('../controllers');

router.route('/')
  .get(validationToken, getAllUser)
  .post(createUser)
  .put()
  .delete();

router.route('/:id')
  .get(validationToken, getUserById)
  .post()
  .put()
  .delete();

router.route('/me')
  .get()
  .post()
  .put()
  .delete(validationToken, deleteUser);

module.exports = router;
