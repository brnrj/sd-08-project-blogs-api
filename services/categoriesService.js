const { Category } = require('../models');
const validateName = require('./categoryValidations/validateName');

const insertCategory = async (name) => {
  try {
    const isValid = validateName(name);

    if (isValid.err) return isValid;

    const result = await Category.create({ name });
    return result;
  } catch (e) {
    return { message: 'erro, olhe o console' };
  }
};

const getAllCategories = async () => {
    try {
      const response = Category.findAll();
      
      if (!response) return { err: { message: 'erro na consulta ao banco', status: 500 } };
      
      return response;
    } catch (e) {
      return { message: 'erro, olhe o console' };
    }
  };

module.exports = {
  insertCategory,
  getAllCategories,
};