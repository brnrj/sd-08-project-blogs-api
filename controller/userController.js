const { Users } = require('../models');

const createUsers = async (req, res) => {
  console.log('aqui Controller');
  console.log(req.body);
  try {
    const user = req.body;
    await Users.create(user);
    return res.status(201).json({ token: 'LorenIpsonlorenippsono' });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { createUsers };