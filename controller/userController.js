const user = require('../services/user');

const OK = 201;
const SUCCESS = 200;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await user.validUser(displayName, email, password, image);
    return res.status(OK).json(newUser);
  } catch (e) {
    if (e.message === 'User already registered') {
      return res.status(409).json({
        message: e.message,
      });
    }
    return res.status(400).json({
      message: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await user.login(email, password);
    return res.status(SUCCESS).json({ token: userLogin });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const allUsers = await user.findAllUsers();
    return res.status(SUCCESS).json(allUsers);
  } catch (e) {
    return res.status(401).json({
      message: e.message,
    });
  }
};

const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
   
    const oneUser = await user.findOneUserById(id);
    return res.status(SUCCESS).json(oneUser);
  } catch (e) {
    if (e.message === 'User does not exist') {
      return res.status(404).json({
        message: e.message,
      });
    }
    return res.status(401).json({
      message: e.message,
    });
  }
};

module.exports = { 
  createUser,
  login,
  findAllUsers,
  findOneUser,
};
