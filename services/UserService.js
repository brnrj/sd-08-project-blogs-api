const validData = (displayName) => {
  if (displayName.length < 8) {
    return false;
  }

  return true;
};

module.exports = { validData };
