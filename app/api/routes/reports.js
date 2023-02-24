const { Op } = require('sequelize')
const { IngredientStock, StockAudit } = require('../models')
const { staffValidator } = require('./middleware')

const LOCATION_ID = process.env.LOCATION_ID


module.exports = () => {
  const router = require('express-promise-router')()

  router.get('/inventory', staffValidator, inventoryReport)
  router.get('/costs', staffValidator, costReport)
  return router
}


const inventoryReport = async (req, res, next) => {

  const { staffMember } = res.locals

  const canView = await staffMember.canViewReports()
  if(!canView){
    return res.status(400).send({ message: `${staffMember.name} cannot view report data` })
  }

  const { start_date: startDate, end_date: endDate } = req.query
  if(!startDate || !endDate){
    return res.status(422).send({ message: 'Please provide a start_date and an end_date as query parameters' })
  }

  const audits = await StockAudit.findAll({
    where: {
      location_id: LOCATION_ID,
      created_at: { [Op.between]: [startDate, endDate] }
    }
  })

  res.status(200).send(audits)
}



const costReport = async (req, res, next) => {

}
