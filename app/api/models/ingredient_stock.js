const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class IngredientStock extends Model {

    static associate(models) {
      this.belongsTo(models.Ingredient)
    }

    static async haveRequiredStock (recipeId, locationId) {
      const { RecipeContent } = sequelize.models
      const recipeContents = await RecipeContent.findAll({ where: { recipe_id: recipeId } })
      let haveStock = true 
      for(let content of recipeContents){
        const stockItem = await this.findOne({ where: { location_id: locationId, ingredient_id: content.ingredient_id } })
        if(stockItem.unit_count < content.ingredient_quantity){
          // Not tracking which ingredients are out of stock, just that we don't have enough stock
          haveStock = false 
          break
        }
      }

      return haveStock
    }

    static async addStock (locationId, ingredientId, units) {
      const stockItem = await this.findOne({ where: { location_id: locationId, ingredient_id: ingredientId } })
      await stockItem.increment('unit_count', { by: units })
    }

    static async reduceStock (locationId, ingredientId, units) {
      const stockItem = await this.findOne({ where: { location_id: locationId, ingredient_id: ingredientId } })
      await stockItem.decrement('unit_count', { by: units })
    }


    static async reduceStockForRecipe (recipeId, locationId) {
      const { RecipeContent } = sequelize.models
      const recipeContents = await RecipeContent.findAll({ where: { recipe_id: recipeId } })
      for(let content of recipeContents){
        const stockItem = await this.findOne({ where: { location_id: locationId, ingredient_id: content.ingredient_id } })
        await stockItem.decrement('unit_count', { by: content.ingredient_quantity })
      }
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
    unit_count: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'IngredientStock',
    underscored: true,
  })
  return IngredientStock
}