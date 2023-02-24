'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecipeContents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipe_id: {
        type: Sequelize.INTEGER
      },
      ingredient_id: {
        type: Sequelize.INTEGER
      },
      ingredient_quantity: {
        type: Sequelize.DECIMAL
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RecipeContents')
  }
}