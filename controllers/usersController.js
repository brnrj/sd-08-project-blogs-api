const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  addUser,
  findAllUsers,
} = require('../services/midlewares/userService');
const {
  CREATED,
  OK,
} = require('../services/consts');
const { userRegisterValidations } = require('../services/validations');
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

// 3 - Sua aplicação deve ter o endpoint GET /user
router.get('/',
rescue(decodeToken),
rescue(findAllUsers),
async (req, res) => {
  const { allUsers } = req;
  return res.status(OK).json(allUsers);
});

module.exports = { router };
