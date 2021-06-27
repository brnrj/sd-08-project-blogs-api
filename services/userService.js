const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models');
const {
  CREATED,
} = require('./consts');
const { generateToken } = require('./jwt');
// const { verifyConflictEmails, addUser } = require('../models/usersModel');
// const { validateEmail } = require('./jokerFunctions');

const app = express();
app.use(bodyParser.json());

// const userValidation = (body) => {
//   const { name, email, password } = body;
//   if (!name || !email || !password || !validateEmail(email)) {
//     throw Object.assign(
//       new Error('Invalid entries. Try again.'),
//       { status: BAD_REQUEST },
//    );
//   }
// };

// 1 - Crie um endpoint para o cadastro de usuários
const tryAddUser = async (body, res) => {
  try {
    // await verifyConflictEmails(body.email);
    // userValidation(body);
    const { password, ...remainingbody } = body;
    await User.create(body);
    const token = generateToken({ ...remainingbody });
    return res.status(CREATED).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  tryAddUser,
};