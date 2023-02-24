
module.exports = () => {
  const router = require('express-promise-router')()

  router.post('/', makeSale)
  return router
}


const makeSale = async (req, res, next) => {

}