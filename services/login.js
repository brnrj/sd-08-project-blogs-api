const STATUS_400 = 400;

const validLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') { 
    return res.status(STATUS_400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(STATUS_400).json({ message: '"password" is not allowed to be empty' });
  }
  if (email === undefined) return res.status(STATUS_400).json({ message: '"email" is required' });
  if (password === undefined) {
     return res.status(STATUS_400).json({ message: '"password" is required' });  
  }
  // if (!validEmail(email) || !validPassword(password)) {
  //   res.status(STATUS_400).json({ message: 'Invalid fields' });
  // }
  next();
};

module.exports = {
  validLogin,  
};