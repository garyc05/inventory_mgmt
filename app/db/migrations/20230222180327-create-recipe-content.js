'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_contents', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      recipe_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'composite_key'
      },
      ingredient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'composite_key'
      },
      ingredient_quantity: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 0
      }
    }, {
      uniqueKeys: {
        composite_key: {
          customIndex: true,
          fields: ['recipe_id', 'ingredient_id']
        }
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe_contents')
  }
}