const express = require('express');
const rescue = require('express-rescue');

const { User } = require('../models');
const { validateUser, createToken, auth } = require('../middlewares');

const router = express.Router();

router.post('/', validateUser, createToken,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token: res.token });
  }));
  
router.get('/', auth,
  rescue(async (_req, res) => {
    const users = await User.findAll();

    return res.status(200).json(users);
  }));

router.get('/:id', auth,
  rescue(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      const err = new Error('User does not exist');
      err.statusCode = 404;
      throw err;
    }

    return res.status(200).json(user);
  }));

router.delete('/me', auth,
  rescue(async (req, res) => {
    const userId = req.user;
    await User.destroy({ where: { id: userId } });

    return res.status(204).send();
}));

module.exports = router;