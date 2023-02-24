const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Allergens extends Model {
    static associate(models) {
      // define association here
    }
  }
  Allergens.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allergens',
    underscored: true,
  })
  return Allergens
}