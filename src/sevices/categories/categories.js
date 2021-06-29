const { Categorie } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validCategories,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validCategories.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const result = await Categorie.create(data);
  return result;
};

const findServices = async () => {
  const result = await Categorie.findAll();
  return result;
};

// const findIdServices = async (id) => {
//   console.log('linha 6', id);
//   const result = await Categories.findOne({ where: { id } });
//   console.log('linha 8', result);
//   if (result === null) return { status: helpers.QOQ, message: 'User does not exist' };
//   return result;
// };

// const loginServices = async (data) => {
//   const { error } = validLogin.validate(data);
//   if (error) return { status: helpers.QOO, message: error.details[0].message };

//   const { email } = data;
//   const emailExists = await User.findOne({ where: { email } });
//   if (emailExists === null) return { status: helpers.QOO, message: 'Invalid fields' };
  
//   const payload = {
//     _id: emailExists.id,
//     email: data.email,
//     role: true,
//   };

//   const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
//   return token;
// };

module.exports = {
  createServices,
  findServices,
  // findIdServices,
  // loginServices,
};
