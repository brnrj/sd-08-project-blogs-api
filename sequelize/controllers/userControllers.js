const express = require('express');
const { validateUserRegister } = require('../middlewares/userValidations');
const validateToken = require('../middlewares/validateToken');

const { Users } = require('../models');

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
  .then((users) => {
    res.status(200).json(users);
  });
});

router.get('/:id', validateToken, (req, res) => {
  Users.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User does not exist' });
      }
      const { password: _, ...UserWithoutPassword } = user.dataValues;
      
      res.status(200).json(UserWithoutPassword);
    })
   .catch((e) => {
    console.log(e.message);
    res.status(500).send({ message: 'Algo deu errado' });
  });
});

// router.delete('/:id', (req, res) => {
//   Users.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//   .then((users) => {
//     res.status(200).send({ message: 'Usuário excluído com sucesso.' });
//   })
//   .catch((e) => {
//     console.log(e.message);
//     res.status(500).send({ message: 'Algo deu errado' });
//   });
// })

// router.put('/:id', (req, res) => {
//   const { name, username, email, password } = req.body;
//   Users.update(
//     { name, username, email, password },
//     { where:{ id: req.params.id } }
//   )
//   .then((users) => {
//     res.status(200).send({ message: 'Usuário atualizado com sucesso.' });
//   })
//   .catch((e) => {
//     console.log(e.message);
//     res.status(500).send({ message: 'Algo deu errado' });
//   });
// })

module.exports = router;