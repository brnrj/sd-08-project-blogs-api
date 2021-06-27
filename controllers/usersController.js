const usersServices = require('../services/usersServices');
const { code } = require('../helpers/messages');

const createUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { displayName, email, password, image } = req.body;
    const user = await usersServices.createUser({ displayName, email, password, image });
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'User already registered') {
      res.status(code.CONFLICT).json({ message: error.message });
    }
    res.status(error.code).json({ message: error.message });
  }
};

const getUsersAll = async (req, res) => {
  try {
    const usersAll = await usersServices.getUsersAll();

    return res.status(code.OK).json(usersAll);
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsersAll,
};