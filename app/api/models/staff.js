const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      // define association here
    }
  }
  Staff.init({
    name: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    iban: DataTypes.STRING,
    bic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Staff',
    underscored: true,
  })
  return Staff
}