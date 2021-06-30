const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  addUser,
  findAllUsers,
  findUser,
} = require('../services/midlewares/userService');
const {
  CREATED,
  OK,
} = require('../services/consts');
const { userRegisterValidations,
  findUserByIdValidation } = require('../services/midlewares/userValidations');
const { decodeToken } = require('../services/midlewares/jwt');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// 1 - Sua aplicação deve ter o endpoint POST /user

router.post('/',
rescue(userRegisterValidations),
rescue(addUser),
(req, res) => {
  const { token } = req;
  return res.status(CREATED).json({ token });
});

// 4 - Sua aplicação deve ter o endpoint GET /user/:id
router.get('/:id',
rescue(decodeToken),
rescue(findUserByIdValidation),
rescue(findUser),
(req, res) => {
  const { tratedUser } = req;
  return res.status(OK).json(tratedUser);
});

// 3 - Sua aplicação deve ter o endpoint GET /user
router.get('/',
rescue(decodeToken),
rescue(findAllUsers),
(req, res) => {
  const { tratedUsers } = req;
  return res.status(OK).json(tratedUsers);
});

module.exports = { router };
