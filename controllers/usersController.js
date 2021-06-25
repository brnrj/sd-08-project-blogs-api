const userService = require('../services/userService');
const StatusCode = require('../messages/statusCodeMessages');

const create = async (req, res) => {
  try {
    const user = req.body;

    const createdUser = await userService.create(user);

    res.status(StatusCode.CREATED).json(createdUser);
  } catch (err) {
    const { message, code } = err;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

module.exports = {
  create,
};
