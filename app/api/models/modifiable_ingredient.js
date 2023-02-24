const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ModifiableIngredient extends Model {
    static associate(models) {
      // define association here
    }
  }
  ModifiableIngredient.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    ingredient_id: DataTypes.INTEGER,
    ingredient_quantity: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ModifiableIngredient',
    underscored: true,
  })
  return ModifiableIngredient
}