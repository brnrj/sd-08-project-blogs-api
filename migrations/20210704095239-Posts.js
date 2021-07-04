"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BlogPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          foreingKey: 'id',
        },
      },
      published: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      // categoryIds: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Categories',
      //     foreingKey: 'id',
      //   },
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BlogPosts");
  },
};
