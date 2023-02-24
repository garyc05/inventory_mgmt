const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RecipeContent extends Model {
    static associate(models) {
      // define association here
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
  })
  return RecipeContent
}