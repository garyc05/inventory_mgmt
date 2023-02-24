const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class IngredientStock extends Model {
    static associate(models) {
      // define association here
    }
  }
  IngredientStock.init({
    ingredient_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    unit_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IngredientStock',
    underscored: true,
  })
  return IngredientStock
}