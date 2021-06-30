const ServiceCategorie = require('../services/serviceCategory');
const code = require('../utils/code');

const addCategorie = async (req, res, next) => {
  const { name } = req.body;
  const resultService = await ServiceCategorie.addNewCategorie({ name });
  if (!resultService.categorie) return next(resultService);
  return res.status(code.created).json(resultService.categorie);
};

module.exports = {
  addCategorie,
};
