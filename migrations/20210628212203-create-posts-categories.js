'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      categoryId: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      postId: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories', null, {});
  }
};
