const express = require('express');
const { validateUserRegister } = require('../middlewares/userValidations');

const { Users } = require('../models');

const router = express.Router();
router.post('/', validateUserRegister, (req, res) => {
  const { displayName, email, password, image } = req.body;
  Users.create({ displayName, email, password, image })
    .then((newUser) => {
      const { password: _, ...UserWithoutPassword } = newUser.dataValues;
      res.status(201).send(UserWithoutPassword);
    });
    // .catch((err) => {
    //   console.log(err.message);
    //   res.status(500).send({ message: 'Algo deu errado.' });
    // });
  // const token = tokenGenerator(UserWithoutPassword);
  // res.locals.user = token;
});

router.get('/', (req, res) => {
  Users.findAll()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).send({ message: 'Algo deu errado.' });
  });
});

// router.get('/:id', (req, res) => {
//   Users.findByPk(req.params.id)
//     .then((user) => {
//       if (user === null) {
//         res.status(404).send({ message: 'Usuário não encontrado.'})
//       }
//       if (!req.query.includeProducts) res.status(200).json(user);
//       return user.getProducts().then((products) => {
//         // res.status(200).json({ ...user, products });
//         res.status(200).json({ user, products });
//       })
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res.status(500).send({ message: "Algo deu errado." });
//     })
// })

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