'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipe_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      has_allergens: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      modifiable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menu_items')
  }
}