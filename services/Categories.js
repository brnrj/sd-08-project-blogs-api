const { General } = require('../models');
const { resources: { Categories } } = require('../.env.js');

const getAll = async () => {
  const resources = await General.getAll(Categories.tableOrCollec);
  return { result: resources };
};

const findById = async (id) => {
  const resource = await General.findById(Categories.tableOrCollec, id);
  if (!resource) {
    return { error: {
    code: 'not_found', message: `${Categories.singular} not found` } };
  }
  return { result: resource };
};

const insertOne = async (obj) => {
  const insertedId = await General.insertOne(Categories.tableOrCollec, obj);
  if (!insertedId) {
    return { error: {
    code: 'already_exists', message: `${Categories.singular} already exists` } };
  }
  return { result: { _id: insertedId, ...obj } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(Categories.tableOrCollec, id);
  if (!resp) {
    return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  }
  return { result: {
    message: `The ${Categories.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await General.updateById(Categories.tableOrCollec, id, obj);
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
