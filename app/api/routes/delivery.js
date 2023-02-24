
module.exports = () => {
  const router = require('express-promise-router')()

  router.post('/', newDelivery)
  return router
}


const newDelivery = async (req, res, next) => {
  res.sendStatus(200)
}
