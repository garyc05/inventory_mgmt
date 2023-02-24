const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      // define association here
    }
  }
  Sale.init({
    staff_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    sale_price: DataTypes.DECIMAL,
    cost_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Sale',
    underscored: true,
  })
  return Sale
}