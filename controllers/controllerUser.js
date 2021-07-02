const ServiceUser = require('../services/serviceUser');
const code = require('../utils/code');

const controllerAdd = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const resultService = await ServiceUser.addUser({ displayName, email, password, image });
  if (!resultService.token) return next(resultService);
  return res.status(code.created).json(resultService);
};

const getAll = async (_req, res, next) => {
  const resultService = await ServiceUser.getAllUser();
  if (!resultService.user) return next(resultService);
  return res.status(code.ok).json(resultService.user);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await ServiceUser.getById(id);
  if (!resultService.user) return next(resultService);
  return res.status(code.ok).json(resultService.user);
};

const deleteUse = async (req, res, next) => {
  const { id } = req.payload;
  const service = await ServiceUser.deleteMe(id);
  if (!service.post) return next(service);
  res.status(code.notContent).json(service.post);
};

module.exports = {
  controllerAdd,
  getAll,
  getById,
  deleteUse,
};