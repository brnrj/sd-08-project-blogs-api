module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoryId: DataTypes.INTEGER,
  }, {
    timestamp: false,
  });
  return PostCategory;
};