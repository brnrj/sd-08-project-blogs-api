const { Users } = require('../models');

const createUsers = async (req, res) => {
  console.log('aqui Controller');
  console.log(req.body);
  try {
    const data = req.body;
    await Users.create(data);
    return res.status(201).json({ token: 'LorenIpsonlorenippsono' });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { createUsers };