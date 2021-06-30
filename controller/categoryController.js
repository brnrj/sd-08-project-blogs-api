const cat = require('../services/category');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await cat.createCategory(name);
    res.status(201).json(newCategory);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = {
  create,
};
