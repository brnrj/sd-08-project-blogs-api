'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BlogPosts', 'userId', {
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Users',
        foreingKey: 'id',
      },
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BlogPosts', 'userId')
  }
};
