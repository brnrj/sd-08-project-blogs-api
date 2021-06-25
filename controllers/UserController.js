const UserService = require('../services/UserService.js');
const { Users } = require('../models');
const message = require('../helpers/errorMessages');
const tokenGen = require('../services/tokenGenerator');

const UserController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  if (!UserService.validData(displayName)) {
    return res.status(400).json({ message: message.displayNameError });
  }

  const userAlready = await Users.findOne({ where: { email } });

  if (userAlready) {
    return res.status(409).json({ message: message.userAlreadyError });
  }

  await Users.create({ 
    displayName,
    email,
    password,
    image,
  });

  const token = tokenGen(email);

  res.status(201).json({ token });
};

module.exports = UserController;
