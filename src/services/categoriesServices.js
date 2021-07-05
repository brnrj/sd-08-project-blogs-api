// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
// const boom = require('@hapi/boom');
const { Categorie } = require('../../models');

const findByKey = async (key, value) => {
  try {
    console.log(key, value, { key: value });
    const foundCategories = await Categorie.findOne({ where: key[value] });
    return foundCategories;
  } catch (error) {
    return { isBoom: true };
  }
};

const create = async (CategoriesInfos) => {
  // const { name } = CategoriesInfos;
  // console.log('name', name);
  // const foundCategories = await findByKey('name', name);
  // if (foundCategories !== null) {
  //   return boom.conflict(process.env.ALREADY_REGISTERED);
  // }
  console.log(CategoriesInfos);
  const created = Categorie.create(CategoriesInfos);
  return created;
};

const findAll = async () => {
  const foundAll = await Categorie.findAll();
  // console.log('FOUND', foundAll);

  return foundAll;
};

module.exports = {
  create,
  findAll,
  findByKey,
};