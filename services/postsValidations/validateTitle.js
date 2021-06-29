const BAD_REQUEST_STATUS = 400;

const validateTitle = (title) => {
  if (title === undefined) {
    return {
      err: { status: BAD_REQUEST_STATUS, message: '"title" is required' },
    };
  }
  return {};
};

module.exports = validateTitle;