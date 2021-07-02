const { createNewCategory } = require('../../services');

const createTheCategory = async (req, res, _next) => {
  try {
    const { name } = req.body;
    const creating = await createNewCategory(name);
    res.status(201).send(creating);
  } catch (e) {
    console.log(e.message, 'Controllers, createCategory.js');
    res.status(500).send(e.message);
  }
};

module.exports = createTheCategory;
