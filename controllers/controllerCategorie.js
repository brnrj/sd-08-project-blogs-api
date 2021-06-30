const ServiceCategorie = require('../services/serviceCategory');
const code = require('../utils/code');

const addCategorie = async (req, res, next) => {
  const { name } = req.body;
  const service = await ServiceCategorie.addNewCategorie({ name });
  if (!service.categorie) return next(service);
  return res.status(code.created).json(service.categorie);
};

const getAll = async (req, res, next) => {
 const service = await ServiceCategorie.getAll();
 if (!service.categorie) return next(service);
 return res.status(code.ok).json(service.categorie);  
};

module.exports = {
  addCategorie,
  getAll,
};
