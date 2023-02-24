const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class IngredientStock extends Model {

    static associate(models) {
      this.belongsTo(models.Ingredient)
    }

    static async haveRequiredStock (locationId, ingredientId, desiredQuantity) {
      const ingredient = await this.findOne({ where: { location_id: locationId, ingredient_id: ingredientId } })
      return ingredient && ingredient.unit_count >= desiredQuantity
    }

    static async addStock (locationId, ingredientId, units) {
      const stockItem = await this.findOne({ where: { location_id: locationId, ingredient_id: ingredientId } })
      await stockItem.increment('unit_count', { by: units })
    }

    static async reduceStock (locationId, ingredientId, units) {
      const stockItem = await this.findOne({ where: { location_id: locationId, ingredient_id: ingredientId } })
      await stockItem.decrement('unit_count', { by: units })
    }


    static async stockValue (locationId) {
      const { Ingredient } = sequelize.models
      const stockItems = await this.findAll({ where: { location_id: locationId }, include: Ingredient })
      const value = stockItems.reduce((accumulator, stockItem) => accumulator + (stockItem.unit_count * stockItem.Ingredient.cost), 0)
      return value
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