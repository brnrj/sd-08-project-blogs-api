const { loggedIn } = require('../../services');

const loginUser = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const tokenGenerated = await loggedIn({ email, password });
    return res.status(200).send(tokenGenerated);
  } catch (e) {
    console.log(e.message, 'Controllers, login.js');
    res.status(500).send(e.message);
  }
};

module.exports = loginUser;
