const express = require('express');
const auth = require('../middlewares/auth');
const {
  createUser,
  findAllUsers,
  findUserById,
} = require('../controllers/users');

const router = express.Router();

router.post('/', createUser);
router.get('/', auth, findAllUsers);
router.get('/:id', auth, findUserById);

module.exports = router;
