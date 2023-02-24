
module.exports = {
  dialect: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'inventory_mgmt',
  host: '127.0.0.1',
  pool: {
    max: 10,
    min: 0,
    acquire: 2000,
    idle: 2000
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}