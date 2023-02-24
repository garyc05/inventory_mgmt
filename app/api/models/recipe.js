const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      this.hasMany(models.RecipeContent)
    }
  }
  Recipe.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
    underscored: true,
  })
  return Recipe
}