const { sequelize, IngredientStock, StockAudit } = require('../models')
const { staffValidator } = require('./middleware')

const LOCATION_ID = process.env.LOCATION_ID


// Exports the router with attached middleware and endpoint handler(s)
module.exports = () => {
  const router = require('express-promise-router')()

  router.post('/', staffValidator, newDelivery)
  return router
}


const doStockUpdates = async (staffId, ingredientId, units) => {
  await sequelize.transaction(async (t) => {
    await IngredientStock.addStock(LOCATION_ID, ingredientId, units)
    await StockAudit.addDeliveryAudit({
      staff_id: staffId,
      ingredient_id: ingredientId,
      location_id: LOCATION_ID,
      unit_change: units
    })
  })
}


// Endpoint Handler Added to Route
const newDelivery = async (req, res, next) => {

  const { data } = req.body
  const { staffMember } = res.locals

  const canAccept = await staffMember.canAcceptDelivery()
  if(!canAccept){
    return res.status(400).send({ message: `${staffMember.name} cannot accept deliveries` })
  }

  // Handle bulk or single items from request. Depending on a UI (if I get there) one may be better than the other for it's use case!!
  if(Array.isArray(data)){
    for(let item of data){
      await doStockUpdates(staffMember.id, item.ingredient_id, item.units)
    }
  } else {
    await doStockUpdates(staffMember.id, data.ingredient_id, data.units)
  }

  res.sendStatus(201)
}
