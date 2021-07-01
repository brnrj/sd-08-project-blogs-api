const { tokenGenerateForLogin } = require('../utils');

const loggedIn = async ({ email, password }) => {
  try {
    const tokenGenerated = tokenGenerateForLogin({ email, password });
    return tokenGenerated;
  } catch (e) {
    console.log(e.message, 'loggedIn');
    return e.message;
  }
};

module.exports = loggedIn;
