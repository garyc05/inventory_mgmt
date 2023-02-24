const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RecipeContent extends Model {
    static associate(models) {
      this.belongsTo(models.Ingredient)
    }

    static async costPrice(recipeId) {
      const { Ingredient } = sequelize.models
      const contents = await this.findAll({ where: { recipe_id: recipeId } })
      let totalCost = 0
      for(let content of contents) {
        const ingredient = await Ingredient.findByPk(content.ingredient_id)
        totalCost += ingredient.cost * content.ingredient_quantity
      }
      return totalCost
    }
  }
  RecipeContent.init({
    recipe_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    ingredient_quantity: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'RecipeContent',
    underscored: true,
    tableName: 'recipe_contents'
  })
  return RecipeContent
}