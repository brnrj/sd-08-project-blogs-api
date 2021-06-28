const { Users } = require('../models/index');

const newUser = async (req, res) => {
  try {
    const data = req.body;
    await Users.create(data);
    return res.status(201).json({ token: 'asdasdsadqweqwerwsdvxc' });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const getAll = async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const findOne = async (req, res) => { // por id
  try {
    const { id } = req.params;
    const users = await Users.findByPk(id);
    if (!users) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/* const findUser = async (email) => { // pro token
  const user = await Users.findOne({ where: { email } });
  return user;
}; */

module.exports = {
  newUser, getAll, findOne, /* findUser */
};