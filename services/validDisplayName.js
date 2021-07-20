function validDisplayName(name) {
  if (name.length >= 8) return true;
  return '"displayName" length must be at least 8 characters long';
}

module.exports = validDisplayName;