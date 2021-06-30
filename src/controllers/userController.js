const UserService = require('../services/userService');

const SERVER_ERROR = 500;
const CREATED = 201;

const addUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await UserService
      .addUser(displayName, email, password, image);
    return res.status(CREATED).json({ token });
  } catch (err) {
    // console.log(err);
    res.status(SERVER_ERROR).json({ message: 'Erro brabo' });
  }
};

module.exports = {
  addUser,
};