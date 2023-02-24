const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.Staff, { through: 'StaffRole' })
    }
  }
  Role.init({
    name: DataTypes.STRING,
    accept_deliveries: DataTypes.BOOLEAN,
    make_sales: DataTypes.BOOLEAN,
    view_reports: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Role',
    underscored: true,
  })
  return Role
}