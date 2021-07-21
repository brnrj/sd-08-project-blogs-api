const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const user = req.body;
    await Users.findOne({ where: { email: user.email, password: user.password } });

    const token = jwt.sign({ data: user.email }, process.env.JWT_SECRET);
    
    return res.status(200).json({ token });
  } catch (error) {
    console.log('ERREI AQUIIIOH');
    return res.status(400).json(error.message);
  }
};

module.exports = { login };