const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      this.belongsToMany(models.Staff, { through: 'StaffLocation' })
    }
  }
  Location.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
    underscored: true,
  })
  return Location
}