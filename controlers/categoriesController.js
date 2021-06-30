const {
  categoriesServices: {
    createCategory,
    showCategories,
  },
} = require('../services');
const code = require('../services/codes');

const categoryCreate = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const result = await createCategory(name);
    console.log(result);

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

const getCategories = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await showCategories(name);

    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = {
  categoryCreate,
  getCategories,
};