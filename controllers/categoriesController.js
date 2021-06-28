const categoryService = require('../services/categoryService');
const { CREATED, INTERNAL_SERVER_ERROR } = require('../messages/statusCodeMessages');

const create = async (req, res) => {
  try {
    const categorie = req.body;

    const createdCategorie = await categoryService.create(categorie);

    res.status(CREATED).json(createdCategorie);
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
};
