'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staff_roles', {
      staff_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'composite_key',
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'composite_key',
      }
    }, {
      uniqueKeys: {
        composite_key: {
          customIndex: true,
          fields: ['staff_id', 'role_id']
        }
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staff_roles')
  }
}