module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('categories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false },
  }),
  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('categories'),
};
