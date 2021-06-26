const { User } = require('../models');
const { create } = require('../services/loginService');

const login = {
  usuarioLogado: { message: 'Success returned Token', status: 200 },
}

const createLogin = async (req, res) => {
  const { email, password } = req.body;
  const { result, token } = await create({ email, password });
  const { usuarioLogado } = login;
  if (result === true && token) {
    /*
      const login = await Login(um model de login).create({email, token});
    */
    return res.status(usuarioLogado.status).json({ token });
  }
  if (result && !token) {
    return res.status(result.status).json({ message: result.message });
  }
  
  const getUser = await User.findAll(req.body);

  if (!getUser) return res.status(404).json({ message: 'Usuário não cadastrado' });

  res.status(200).json(getUser);
};

module.exports = {
  createLogin,
};