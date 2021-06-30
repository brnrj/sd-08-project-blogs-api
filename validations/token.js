const verifyToken = (token) => {
  if (!token) throw new Error('Token not found$401');
  
  const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  if (!regex.test(token)) throw new Error('Expired or invalid token$401');
};

module.exports = verifyToken;
