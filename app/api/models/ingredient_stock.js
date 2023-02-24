const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class IngredientStock extends Model {

    static associate(models) {}

    static async haveRequiredStock (locationId, ingredientId, desiredQuantity) {
      const ingredient = await this.findOne({ where: { location_id: locationId, ingredient_id: ingredientId } })
      return ingredient && ingredient.unit_count >= desiredQuantity
    }


    static async reduceStock () {
      
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