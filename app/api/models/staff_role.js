const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StaffRole extends Model {
    static associate(models) {}
  }
  StaffRole.init({
    staff_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StaffRole',
    underscored: true,
    tableName: 'staff_roles'
  })
  return StaffRole
}