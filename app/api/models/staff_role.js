const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StaffRole extends Model {
    static associate(models) {
      // define association here
    }
  }
  StaffRole.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StaffRole',
    underscored: true,
  })
  return StaffRole
}