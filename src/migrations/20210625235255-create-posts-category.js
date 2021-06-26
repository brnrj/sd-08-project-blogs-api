module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategories = await queryInterface
      .createTable('PostsCategories', {
        postid: 
          { type: Sequelize.INTEGER,
references: { 
            model: 'BlogPosts', key: 'id' },
onUpdate: 'CASCADE',
onDelete: 'CASCADE' },
        categoryId: 
          { type: Sequelize.INTEGER,
references: {
            model: 'Categories', key: 'id', onUpdate: 'CASCADE', onDelete: 'CASCADE' } },
    });
    return PostsCategories;
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  },
};
