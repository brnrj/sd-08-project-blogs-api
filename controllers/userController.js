const { Users } = require('../models/index');

const CREATED = 201;
const OK = 200;

const BAD_REQUEST = 400;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
const newUser = async (req, res) => {
  try {
   const { email } = req.body;
   const user = await Users.findOne({ where: { email } });
   if (user) return res.status(CONFLICT).json({ message: 'User already registered' });
   await Users.create(req.body);
   res.status(CREATED).json({ token: 'asdbasdbaskdbasjkdbasjk' });
  } catch (error) {
    res.status(BAD_REQUEST).json(error.message);
  }
};
const getAll = async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.status(OK).json(users);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error.message);
  }
};
const findOne = async (req, res) => { // por id
  try {
    const { id } = req.params;
    const users = await Users.findByPk(id);
    if (!users) res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* const findUser = async (email) => { // pro token
  const user = await Users.findOne({ where: { email } });
  return user;
}; */

module.exports = {
  newUser, getAll, findOne, /* findUser */
};