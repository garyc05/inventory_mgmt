'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_audits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staff_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ingredient_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      action: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['sale', 'delivery', 'waste']
      },
      unit_change: {
        type: Sequelize.DECIMAL
      },
      cost: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_audits')
  }
}