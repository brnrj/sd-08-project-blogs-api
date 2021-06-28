const jwt = require('jsonwebtoken');
const { Users } = require('./models');

const secret = 'segredosecreto';

const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const emailToken = (email) => {
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
};

const passToken = (password) => {
  if (password === '') return '"password" is not allowed to be empty';
  if (!password) return '"password" is required';
};

const userToken = async (email, password) => {
  const user = await Users.findOne({ where: { email, password } });

  return user;
};
const getToken = async (req, res) => {
  try {
    const jwtConfi = {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
    };

    const { email, password } = req.body;

    /* if (!email) res.status(400).json({ message: '"email" is required' }); */

    /* if (!password) res.status(400).json({ message: '"password" is required' }); */

    /* if (email === '') res.status(400).json({ message: '"email" is not allowed to be empty' }); */

    /* if (password === '') res.status(400).json({ message: '"password" is not allowed to be empty' }); */
    const validation = emailToken(email) || passToken(password);
    if (validation) return res.status(BAD_REQUEST).json({ message: validation });

    const user = await userToken(email, password);
    if (!user) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });

    const token = jwt.sign({ data: user.dataValues.email }, secret, jwtConfi);

    return res.status(OK).json({ token });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error.message);
  }
};

/* const getToken = async (req, res) => {
  try {
    const jwtConfi = {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
    };

const { email, password } = req.body; */

/* if (!email) res.status(400).json({ message: '"email" is required' }); */

/* if (!password) res.status(400).json({ message: '"password" is required' }); */

/* if (email === '') res.status(400).json({ message: '"email" is not allowed to be empty' }); */

/* if (password === '') res.status(400).json({ message: '"password" is not allowed to be empty' }); */
/* const validation = emailToken(email) || passToken(password) || false;
if (validation) res.status(400).json({ message: validation });

const user = await userToken(email, password);
if (!user) res.status(400).json({message:'Invalid fields'}) 

const token = jwt.sign({ data: user.dataValues.email }, secret, jwtConfi);

res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(error.message);
  }
}; */

module.exports = { getToken };
