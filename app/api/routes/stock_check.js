const { sequelize, IngredientStock, StockAudit } = require('../models')
const { staffValidator } = require('./middleware')

const LOCATION_ID = process.env.LOCATION_ID


module.exports = () => {
  const router = require('express-promise-router')()

  router.post('/', staffValidator, stockCheck)
  return router
}


const doStockUpdates = async (staffId, ingredientId, units) => {
  await sequelize.transaction(async (t) => {
    await IngredientStock.reduceStock(LOCATION_ID, ingredientId, units)
    await StockAudit.addWasteAudit({
      staff_id: staffId,
      ingredient_id: ingredientId,
      location_id: LOCATION_ID,
      unit_change: units
    })
  })
}


const stockCheck = async (req, res, next) => {
  const { data } = req.body
  const { staffMember } = res.locals

  if(Array.isArray(data)){
    for(let item of data){
      await doStockUpdates(staffMember.id, item.ingredient_id, item.units)
    }
  } else {
    await doStockUpdates(staffMember.id, data.ingredient_id, data.units)
  }

  res.sendStatus(201)
}