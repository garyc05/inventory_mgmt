
const deliveryRouter = require('./delivery')
const saleRouter = require('./sale')
const stockCheckRouter = require('./stock_check')
const reportsRouter = require('./reports')
const staffRouter = require('./staff')

module.exports = (app) => {
  
  app.use('/delivery', deliveryRouter())
  app.use('/sell', saleRouter())
  app.use('/stock', stockCheckRouter())
  app.use('/reports', reportsRouter())
  app.use('/staff', staffRouter())
  
}