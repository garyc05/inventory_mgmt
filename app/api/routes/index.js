
const deliveryRouter = require('./delivery')
const saleRouter = require('./sale')

module.exports = (app) => {

  app.use('/delivery', deliveryRouter())
  app.use('/sell', saleRouter())


  // Ensure any uncaught exceptions return a server error rather than timeout
  app.use((err, req, res) => {
    if(err){
      console.log(err)
      return res.sendStatus(500)
    }
  })

}