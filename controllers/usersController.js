const { usersUseCasesService } = require('../services');
const { User } = require('../models');  
  
  exports.userAll = async (req, res) => {
      const users = await User.findAll();
      res.status(200).json(users);
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
