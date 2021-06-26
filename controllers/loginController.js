const { User } = require('../models');
const { create } = require('../services/loginService');

const login = {
  usuarioLogado: { message: 'Success returned Token', status: 200 },
};

const createLogin = async (req, res) => {
  const { email, password } = req.body;
  const { usuarioLogado } = login;

  const { result, token } = await create({ email, password });

  if (token) {
    return res.status(usuarioLogado.status).json({ token });
  }
  if (result) {
    return res.status(result.status).json({ message: result.message });
  }

  const getUser = await User.findOne(req.body);

  if (!getUser) {
    return res.status(404).json({ message: 'Usuário não cadastrado' });
  }

  res.status(200).json(getUser);
};

module.exports = {
  createLogin,
};