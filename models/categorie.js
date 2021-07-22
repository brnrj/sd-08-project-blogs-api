const Categories = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
    id: { 
      type: DataTypes.INTEGER,
      AllowNull: false,
      primaryKey: true,
    },  
    name: {
      type: DataTypes.STRING, 
    },
   
  }, { timestamps: false });
  Categories.associate = (models) => {
    Categories.hasMany(
      models.BlogPosts,
      { as: 'categories', foreignkey: 'id' },
    );
  };

  return categories;
};

module.exports = Categories;
