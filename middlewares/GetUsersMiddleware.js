const { User } = require('../models');
const getUserService = require('../services/getUserService');

const GetUsersMiddleware = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const user = await getUserService(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });
  
    return res.status(200).json(user);
  }

  const users = await User.findAll(
    { attributes: ['id', 'displayName', 'email', 'image'] },
  );

  return res.status(200).json(users);
};

module.exports = GetUsersMiddleware;