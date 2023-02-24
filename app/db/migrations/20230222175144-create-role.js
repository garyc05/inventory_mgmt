'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      accept_deliveries: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      make_sales: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      view_reports: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles')
  }
}