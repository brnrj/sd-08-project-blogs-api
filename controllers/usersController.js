const userService = require('../services/userService');
const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('../messages/statusCodeMessages');

const create = async (req, res) => {
  try {
    const user = req.body;

    const createdUser = await userService.create(user);

    res.status(CREATED).json(createdUser);
  } catch (err) {
    const { message, code } = err;
    
    if (code) return res.status(code).json({ message });
    
    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

const getAll = async (_req, res) => {
  try {
    const allUsers = await userService.getAll();

    res.status(OK).json(allUsers);
  } catch (err) {
    const { message, code } = err;

    if (code) return res.status(code).json({ message });

    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    res.status(OK).json(user);
  } catch (err) {
    const { message, code } = err;

    if (code) return res.status(code).json({ message });
    
    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
