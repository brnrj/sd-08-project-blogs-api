module.exports = (callback) => async (...args) => {
  const next = args.slice(-1).pop();
  try {
    await callback(...args);
  } catch (error) {
    next(error);
  }
};
