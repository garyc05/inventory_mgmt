const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StockAudit extends Model {
    static associate(models) {
      // define association here
    }


    static async saleAudit(data) {
      this.create({
        staff_id: data.staff_id,
        ingredient_id: data.ingredient_id,
        location_id: data.location_id,
        action: 'sale',
        unit_change: data.unit_change * -1
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