const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, { through: 'StaffRole' })
      this.belongsToMany(models.Location, { through: 'StaffLocation' })
    }
  }
  Staff.init({
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    iban: DataTypes.STRING,
    bic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Staff',
    underscored: true,
    tableName: 'staff'
  })
  return Staff
}