const BAD_REQUEST = 400;
const INVALID_PW = { message: '"password" length must be 6 characters long' };
const REQUIRED_PW = { message: '"password" is required' };

const valPw = async (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(BAD_REQUEST).json(REQUIRED_PW);
  if (password.length !== 6) return res.status(BAD_REQUEST).json(INVALID_PW);
  next();
};

module.exports = valPw;
