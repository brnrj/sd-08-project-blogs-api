const { Users } = require('../models');
const message = require('../helpers/errorMessages');
const tokenGen = require('../services/tokenGenerator');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (!user || user.password !== password) {
   return res.status(400).json({ message: message.invalidFieldsError });
  }

  const token = tokenGen(email);

  return res.status(200).json({ token });
};

module.exports = login;
