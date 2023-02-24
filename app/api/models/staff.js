const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {

    static associate(models) {
      this.belongsToMany(models.Role, { through: 'StaffRole' })
      this.belongsToMany(models.Location, { through: 'StaffLocation' })
    }


    async canAcceptDelivery() {
      const roles = await this.getRoles()
      return roles.some((role) => role.accept_deliveries) 
    }

    async canMakeSale() {
      const roles = await this.getRoles()
      return roles.some((role) => role.make_sales) 
    }

    async canViewReports() {
      const roles = await this.getRoles()
      return roles.some((role) => role.view_reports) 
    }
    
  }
  Staff.init({
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    iban: DataTypes.STRING,
    bic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Staff',
    underscored: true,
    tableName: 'staff'
  })
  return Staff
}