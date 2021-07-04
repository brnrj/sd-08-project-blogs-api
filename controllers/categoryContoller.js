const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/categoryService');

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.status(StatusCodes.OK).send(categories);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};
const addCategory = async (req, res) => {
  const { name } = req.body;
  const Category = await categoryService.add(name);
  return res.status(StatusCodes.CREATED).send(Category);
};

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const userLogin = await userService.login(email, password);
//   // console.log(findEmail);
//   if (userLogin) {
//     return res.status(StatusCodes.OK).json({ token: userLogin });
//   }
//   return res
//     .status(StatusCodes.BAD_REQUEST)
//     .json({ message: 'Invalid fields' });
// };

// const getUserById = async (req, res) => {
//   const { id } = req.params;

//   const findId = await userService.findById(id);
//   if (findId !== null) {
//     return res.status(StatusCodes.OK).json(findId);
//   }
//   return res
//     .status(StatusCodes.NOT_FOUND)
//     .json({ message: 'User does not exist' });
// };

module.exports = {
  getAllCategories,
  addCategory,
  // addUser,
  // loginUser,
  // getUserById,
};
