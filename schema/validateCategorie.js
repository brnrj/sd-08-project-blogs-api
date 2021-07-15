const validateCategorie = (password) => {
  if (password === undefined) {
    return {
      status: 400,
      message: '"name" is required',
    };
  }
  return null;
};

module.exports = validateCategorie;
