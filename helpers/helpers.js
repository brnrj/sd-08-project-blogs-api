const BAD_REQUEST = 400;

const validateDisplayName = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
      return res.status(BAD_REQUEST)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    return next();
  };

  const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const re = /\S+@\S+\.\S+/;
    const isValid = re.test(email);
    if (!email) return res.status(BAD_REQUEST).json({ message: '"email" is required' });
    if (!isValid) return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
    return next();
  };
  
  const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) return res.status(BAD_REQUEST).json({ message: '"password" is required' });
    if (password && password.length < 6) {
      return res.status(BAD_REQUEST)
      .json({ message: '"password" length must be 6 characters long' });
    }
    return next();
  };
  
  const midError = (error, req, res, _next) => {
    console.log(error);
    return res.status(500).send();
  };

  module.exports = {
    validateDisplayName,
    validateEmail,
    validatePassword,    
    midError,
  };