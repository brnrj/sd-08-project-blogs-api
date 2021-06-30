const express = require('express');

const router = express.Router();
const userService = require('../services/UserService');
const middlewareVerifyToken = require('../middleware/verifyToken');

router.post('/', async (req, res) => {
  try {
    const result = await userService.addUser(req.body);
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', middlewareVerifyToken, async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/:id', middlewareVerifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userService.getUserById(id);
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.delete('/me', middlewareVerifyToken, async (req, res) => {
  const { userId } = req;

  try {
    const result = await userService.deleteUser(userId);
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
