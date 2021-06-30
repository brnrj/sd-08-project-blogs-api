const nameValidation = (name) => {
  if (!name || name === '') return '"name" is required';
  return false;
};

module.exports = {
  nameValidation,
};
