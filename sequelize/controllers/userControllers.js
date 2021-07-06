const express = require('express');
const { validateUserRegister } = require('../middlewares/userValidations');
const validateToken = require('../middlewares/validateToken');

const { Users } = require('../models');
const { getTokenUser } = require('../utils/token');

const router = express.Router();
router.post('/', validateUserRegister, (req, res) => {
  const { displayName, email, password, image } = req.body;
  Users.create({ displayName, email, password, image })
    .then((user) => {
      const { password: _, ...UserWithoutPassword } = user.dataValues;
      res.status(201).json(UserWithoutPassword);
    });
});

router.get('/', validateToken, (req, res) => {
  Users.findAll()
  .then((users) => res.status(200).json(users));
});

router.get('/:id', validateToken, (req, res) => {
  Users.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User does not exist' });
      }
      const { password: _, ...UserWithoutPassword } = user.dataValues;
      return res.status(200).json(UserWithoutPassword);
    });
});

router.delete('/me', validateToken, (req, res) => {
  const { id: userId } = getTokenUser(req.headers.authorization);
  Users.destroy({
    where: { id: userId },
  })
  .then(() => res.status(204).send());
});

module.exports = router;