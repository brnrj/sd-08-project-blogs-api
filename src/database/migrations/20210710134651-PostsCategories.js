module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('PostsCategories', {
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'BlogPosts', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Categories', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }),
  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('PostsCategories'),
};
