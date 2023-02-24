const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StockAudit extends Model {
    static associate(models) {}


    static async addSaleAudit(staffId, recipeId, locationId) {
      const { RecipeContent } = sequelize.models
      const recipeContents = await RecipeContent.findAll({ where: { recipe_id: recipeId } })
      for(let content of recipeContents){
        await this.create({
          staff_id: staffId,
          ingredient_id: content.ingredient_id,
          location_id: locationId,
          action: 'sale',
          unit_change: content.ingredient_quantity * -1
        })
      }
    }

    static async addDeliveryAudit(data) {
      const { Ingredient } = sequelize.models
      const costPerUnit = await Ingredient.costFromId(data.ingredient_id)
      this.create({
        staff_id: data.staff_id,
        ingredient_id: data.ingredient_id,
        location_id: data.location_id,
        action: 'delivery',
        unit_change: data.unit_change,
        cost: costPerUnit * data.unit_change
      })
    }

    static async addWasteAudit(data) {
      const { Ingredient } = sequelize.models
      const costPerUnit = await Ingredient.costFromId(data.ingredient_id)
      this.create({
        staff_id: data.staff_id,
        ingredient_id: data.ingredient_id,
        location_id: data.location_id,
        action: 'waste',
        unit_change: data.unit_change * -1,
        cost: costPerUnit * data.unit_change
      })
    }
  }
  StockAudit.init({
    staff_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    action: DataTypes.ENUM('sale', 'delivery', 'waste'),
    unit_change: DataTypes.DECIMAL,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'StockAudit',
    underscored: true,
  })
  return StockAudit
}