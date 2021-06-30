const {
  usersServices: {
    registerUser,
    listUsers,
    listUserById,
    destroyUserById,
  },
} = require('../services');

const code = require('../services/codes');

const userCreate = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await registerUser({ displayName, email, password, image });

    if (result.error) {
      return res.status(result.statusCode).json({
          message: result.error.message,
      });
  }

    return res.status(code.CREATED).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await listUsers();
    if (result.error) return res.status(result.statusCode).json({ message: result.error.message });
    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await listUserById(id);
    if (!result) return res.status(code.NOT_FOUND).json({ message: 'User does not exist' });
    if (result.error) {
      console.log(result.error);
      return res.status(result.statusCode).json({ message: result.error.message });
    }
    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const result = await destroyUserById(authorization);
    if (!result) return res.status(code.NOT_FOUND).json({ message: 'User does not exist' });
    if (result.message) {
      console.log(result.message);
      return res.status(result.UNAUTHORIZED).json({ message: result.message });
    }
    return res.status(code.NO_CONTENT).json();
  } catch (error) {
    console.error(error);
    return res.status(code.UNAUTHORIZED).json({
      message: 'Algo de errado não está certo na usersControler - deleteUserById',
    });
  }
};

module.exports = {
  userCreate,
  getUsers,
  getUsersById,
  deleteUserById,
};