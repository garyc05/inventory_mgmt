const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StaffLocation extends Model {
    static associate(models) {}
  }
  StaffLocation.init({
    staff_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StaffLocation',
    underscored: true,
    tableName: 'staff_locations'
  })
  return StaffLocation
}