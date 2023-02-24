
const deliveryRouter = require('./delivery')
const saleRouter = require('./sale')
const stockCheckRouter = require('./stock_check')
const reportsRouter = require('./reports')

module.exports = (app) => {
  app.use('/delivery', deliveryRouter())
  app.use('/sell', saleRouter())
  app.use('/stockcheck', stockCheckRouter())
  app.use('/reports', reportsRouter())
}