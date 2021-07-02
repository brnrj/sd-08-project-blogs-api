const CategoryService = require('../services/categoryService');

const SERVER_ERROR = 500;
// const OK = 200;
const CREATED = 201;

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await CategoryService.addCategory(name);
    return res.status(CREATED).json(result);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR).json({ message: 'Erro brabo' });
  }
};

module.exports = {
  addCategory,
};