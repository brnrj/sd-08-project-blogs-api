const re = /.+@[A-z]+[.]com/;

const checkEmailExist = (email) => !!email;
const checkEmailValid = (email) => !!re.test(email);

function checkEmail(req, res, next) {
  const { email } = req.body;

  if (!checkEmailExist(email)) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!checkEmailValid(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
}

module.exports = {
  checkEmail,
};