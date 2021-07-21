const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();

const createUsers = async (req, res) => {
  try {
    const user = req.body;
    await Users.create(user);
    return res.status(201).json({ token: 'LorenIpsonlorenippsono' });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, process.env.JWT_SECRET);
    const response = await Users.findAll();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createUsers, getAllUsers };