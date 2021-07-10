module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('BlogPosts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false },
    createdAt: { type: Sequelize.DATE, field: 'published' },
    updatedAt: { type: Sequelize.DATE, field: 'updated' },
  }),
  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('BlogPosts'),
};
