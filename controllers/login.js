const loginServices = require('../services/login');

const login = (req, res) => {
  const user = req.body;

  loginServices.login(user)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err.message);
      const { code, message } = JSON.parse(err.message);
      res.status(code).json({ message });
    });
};

module.exports = {
  login,
};