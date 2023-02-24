const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {}

    static async costFromId (ingredientId) {
      const ingredient = await this.findByPk(ingredientId)
      return ingredient.cost
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Ingredient',
    underscored: true,
  })
  return Ingredient
}