const userServices = require('../services/user');

const createUser = (req, res) => {
  const newUser = req.body;

  userServices.createUser(newUser)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err.message);
      const { code, message } = JSON.parse(err.message);
      res.status(code).json({ message });
    });
};

module.exports = {
  createUser,
};