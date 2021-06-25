const express = require('express');

const router = express.Router();
const userService = require('../services/UserService');

router.post('/', async (req, res) => {
  try {
    const result = await userService.addUser(req.body);
    res.status(result.statusCode).json(result.json);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
