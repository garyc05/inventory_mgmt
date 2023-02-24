const { Op, fn, col } = require('sequelize')
const { IngredientStock, StockAudit, Sale } = require('../models')
const { staffValidator } = require('./middleware')

const LOCATION_ID = process.env.LOCATION_ID


// Exports the router with attached middleware and endpoint handler(s)
module.exports = () => {
  const router = require('express-promise-router')()

  router.get('/inventory/audit', staffValidator, reportViewingValidator, reportDateQueryValidator, inventoryAuditReport)
  router.get('/inventory/value', staffValidator, reportViewingValidator, inventoryValueReport)
  router.get('/financials', staffValidator, reportViewingValidator, reportDateQueryValidator, financialReport)
  return router
}


const roundToTwo = (num) => num ? Number(Math.round(num + "e+" + 2) + "e-" + 2) : 0



// Middleware to check staff role for report viewing
const reportViewingValidator = async (req, res, next) => {
  const { staffMember } = res.locals
  const canView = await staffMember.canViewReports()
  if(!canView){
    return res.status(400).send({ message: `${staffMember.name} cannot view report data` })
  }
  next()
}

// Middleware to ensure date query strings are passed for the endpoints that require them
const reportDateQueryValidator = async (req, res, next) => {
  const { start_date: startDate, end_date: endDate } = req.query
  if(!startDate || !endDate){
    return res.status(422).send({ message: 'Please provide a start_date and an end_date as query parameters' })
  }

  res.locals.startDate = startDate
  res.locals.endDate = endDate
  next()
}



const inventoryAuditReport = async (req, res, next) => {

  const { startDate, endDate } = res.locals

  const audits = await StockAudit.findAll({
    where: {
      location_id: LOCATION_ID,
      created_at: { [Op.between]: [startDate, endDate] }
    }
  })

  res.send(audits)
}



const inventoryValueReport = async (req, res, next) => {
  const totalValue = await IngredientStock.stockValue(LOCATION_ID)
  res.send({ current_inventory_value: roundToTwo(totalValue) })
}



const financialReport = async (req, res, next) => {
  
  const { startDate, endDate } = res.locals

  const delivery = await StockAudit.findAll({
    attributes: [[fn('sum', col('cost')), 'delivery_cost_total']],
    where: { 
      action: 'delivery', 
      location_id: LOCATION_ID,
      created_at: { [Op.between]: [startDate, endDate] }
    },
    raw: true
  })

  const sales = await Sale.findAll({
    attributes: [[fn('sum', col('sale_price')), 'total_revenue']],
    where: { 
      location_id: LOCATION_ID,
      created_at: { [Op.between]: [startDate, endDate] }
    },
    raw: true
  })

  const waste = await StockAudit.findAll({
    attributes: [[fn('sum', col('cost')), 'waste_cost_total']],
    where: { 
      action: 'waste', 
      location_id: LOCATION_ID,
      created_at: { [Op.between]: [startDate, endDate] }
    },
    raw: true
  })

  res.send({
    start_date: startDate,
    end_date: endDate,
    delivery_costs: roundToTwo(delivery[0]?.delivery_cost_total),
    waste_costs: roundToTwo(waste[0]?.waste_cost_total),
    sales_revenue: roundToTwo(sales[0]?.total_revenue)
  })
}
