const {
  HTTP_STATUS_201,
  HTTP_STATUS_200,
  HTTP_STATUS_400,
  HTTP_STATUS_409,
  HTTP_STATUS_401,
  HTTP_STATUS_404,
} = require('../shared/httpTypes');

const {
  userValidate,
  getAllFromDB,
  findUser,
} = require('../services/validate.service');

module.exports = {
  add: async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      const newUser = await userValidate(displayName, email, password, image);
      return res.status(HTTP_STATUS_201).json(newUser);
    } catch (e) {
      if (e.message === 'User already registered') {
        return res.status(HTTP_STATUS_409).json({
          message: e.message,
        });
      }
      return res.status(HTTP_STATUS_400).json({
        message: e.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const allUsers = await getAllFromDB();
      return res.status(HTTP_STATUS_200).json(allUsers);
    } catch (e) {
      return res.status(HTTP_STATUS_401).json({
        message: e.message,
      });
    }
  },
  find: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await findUser(id);
      return res.status(HTTP_STATUS_200).json(user);
    } catch (e) {
      if (e.message === 'User does not exist') {
        return res.status(HTTP_STATUS_404).json({
          message: e.message,
        });
      }
      return res.status(HTTP_STATUS_401).json({
        message: e.message,
      });
    }
  },
};
