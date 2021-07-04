const { Category } = require('../models');
const { resources: { Categories } } = require('../.env.js');

const getAll = async () => {
  const resources = await Category.findAll();
  return { result: resources };
};

const findOneWhere = async (objOptions) => Category.findOne({ where: objOptions });

const findById = async (id) => {
  const resource = await Category.findById(Categories.tableOrCollec, id);
  if (!resource) {
    return { error: {
    code: 'not_found', message: `${Categories.singular} not found` } };
  }
  return { result: resource };
};

const insertOne = async (obj) => {
  const existingCategory = await findOneWhere(obj);
  if (existingCategory) {
    return { error: {
      code: 'alreadyExists', message: 'Category already registered',
    } };
  }
  const newCategory = await Category.create(obj);
  return { result: newCategory };
};

const deleteById = async (id) => {
  const resp = await Category.deleteById(Categories.tableOrCollec, id);
  if (!resp) {
    return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  }
  return { result: {
    message: `The ${Categories.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await Category.updateById(Categories.tableOrCollec, id, obj);
  if (!resp) {
    return { error: {
    code: 'not_found', message: `${Categories.singular} not found` } };
  }
  return findById(id);
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
