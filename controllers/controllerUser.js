const ServiceUser = require('../services/serviceUser');
const code = require('../utils/code');

const controllerAdd = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const resultService = await ServiceUser.addUser({ displayName, email, password, image });
  if (!resultService.token) return next(resultService);
  return res.status(code.created).json(resultService);
};

const getAll = async (req, res, next) => {
  const resultService = await ServiceUser.getAllUser();
  if (!resultService.user) return next(resultService);
  return res.status(code.ok).json(resultService.user);
};

module.exports = {
  controllerAdd,
  getAll,
};