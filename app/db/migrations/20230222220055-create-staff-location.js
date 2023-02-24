'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staff_locations', {
      staff_id: {
        type: Sequelize.INTEGER,
        unique: 'composite_key'
      },
      location_id: {
        type: Sequelize.INTEGER,
        unique: 'composite_key'
      },
    }, {
      uniqueKeys: {
        composite_key: {
          customIndex: true,
          fields: ['staff_id', 'location_id']
        }
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staff_locations')
  }
}