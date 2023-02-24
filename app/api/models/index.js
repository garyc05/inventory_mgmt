const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require('../../db/config')[env]
const db = {}

const jsFileFilter = (file, except) => (file.indexOf('.') !== 0) && (file !== except) && (file.slice(-3) === '.js')


let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,

      // Crazy workaround added here for Decimal Data types
      // Ref => https://github.com/sequelize/sequelize/issues/8019
      hooks: {
        beforeConnect() {
          const cloneType = function (t, parseFn) {
            const clone = {};
            for (const name of Object.getOwnPropertyNames(t)) {
              clone[name] = t[name];
            }
            (clone.key = t.key), (clone.types = t.types), (clone.parse = parseFn);
            return clone;
          };
          const dTypes = {
            DECIMAL: cloneType(Sequelize.DataTypes.postgres.DECIMAL, parseFloat),
            INTEGER: cloneType(Sequelize.DataTypes.postgres.INTEGER, v => parseInt(v, 10)),
            BIGINT: cloneType(Sequelize.DataTypes.postgres.BIGINT, v => parseInt(v, 10)),
          };
          this.connectionManager.refreshTypeParser(dTypes)
        }
      }
    }
  )
}

fs.readdirSync(__dirname)
  .filter(file =>  jsFileFilter(file, basename))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
