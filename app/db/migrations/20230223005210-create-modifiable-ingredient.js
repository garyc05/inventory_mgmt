'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modifiable_ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      ingredient_id: {
        type: Sequelize.INTEGER
      },
      ingredient_quantity: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 1  // Adding arbitrary default value of one unit for a modified ingredient 
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modifiable_ingredients')
  }
}