const { Categories } = require('../models');
const message = require('../helpers/errorMessages');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: message.nameReqError });
  }

  await Categories.create({ name })
    .then((result) => res.status(201).json({
        id: result.insertedId,
        name,
      }));
};

const getAll = async (req, res) => {
  const categories = await Categories.findAll({ attributes:
    { exclude: ['createdAt', 'updatedAt'] } });

  res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};
