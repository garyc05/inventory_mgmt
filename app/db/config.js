const defaultConfig = {
  dialect: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'inventory_mgmt',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

module.exports = {
  development: {
    host: '127.0.0.1',
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 5000
    },
    ...defaultConfig
  },

  production: {
    host: 'db',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 2000,
      idle: 2000
    },
    ...defaultConfig
  }
}