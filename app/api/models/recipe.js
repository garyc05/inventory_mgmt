const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // define association here
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