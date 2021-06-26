const { usersUseCasesService } = require('../services');
const { User } = require('../models');  
  
  exports.userAll = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
      });
      res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  };
  
  exports.createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    try {
    const user = await usersUseCasesService.createUser({ displayName, email, password, image });
      res.status(201).json(user);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  };

  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = await usersUseCasesService.authorizationUser({ email, password });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
