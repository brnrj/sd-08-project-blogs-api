const { BlogPost } = require('../models');
const { resources: { BlogPosts } } = require('../.env.js');

const getAll = async () => {
  const resources = await BlogPost.getAll(BlogPosts.tableOrCollec);
  return { result: resources };
};

const findById = async (id) => {
  const resource = await BlogPost.findById(BlogPosts.tableOrCollec, id);
  if (!resource) {
    return { error: {
    code: 'not_found', message: `${BlogPosts.singular} not found` } };
  }
  return { result: resource };
};

const insertOne = async (obj) => {
  const insertedId = await BlogPost.insertOne(BlogPosts.tableOrCollec, obj);
  if (!insertedId) {
    return { error: {
    code: 'already_exists', message: `${BlogPosts.singular} already exists` } };
  }
  return { result: { _id: insertedId, ...obj } };
};

const deleteById = async (id) => {
  const resp = await BlogPost.deleteById(BlogPosts.tableOrCollec, id);
  if (!resp) {
    return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  }
  return { result: {
    message: `The ${BlogPosts.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await BlogPost.updateById(BlogPosts.tableOrCollec, id, obj);
  if (!resp) {
    return { error: {
    code: 'not_found', message: `${BlogPosts.singular} not found` } };
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
