'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable("BlogPosts", {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    published: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("BlogPosts");
  }
};
