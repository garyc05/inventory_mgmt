const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StockAudit extends Model {
    static associate(models) {
      // define association here
    }
  }
  StockAudit.init({
    staff_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    action: DataTypes.ENUM('sale', 'delivery', 'waste'),
    unit_change: DataTypes.INTEGER,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'StockAudit',
    underscored: true,
  })
  return StockAudit
}