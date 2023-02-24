const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    static associate(models) {
      // define association here
    }
  }
  MenuItem.init({
    recipe_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MenuItem',
    underscored: true,
  })
  return MenuItem
}