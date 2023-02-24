const { sequelize, IngredientStock, StockAudit } = require('../models')
const { staffValidator } = require('./middleware')

const LOCATION_ID = process.env.LOCATION_ID


// Exports the router with attached middleware and endpoint handler(s)
module.exports = () => {
  const router = require('express-promise-router')()

  router.post('/check', staffValidator, stockCheck)
  router.get('/all', getStock)
  return router
}



const doStockUpdates = async (staffId, ingredientId, units) => {
  await sequelize.transaction(async (t) => {
    const currentStock = await IngredientStock.findOne({ where: { ingredient_id: ingredientId, location_id: LOCATION_ID } })
    if(currentStock && (units < currentStock.unit_count)){
      await IngredientStock.reduceStock(LOCATION_ID, ingredientId, units)
      await StockAudit.addWasteAudit({
        staff_id: staffId,
        ingredient_id: ingredientId,
        location_id: LOCATION_ID,
        unit_change: currentStock.unit_count - units
      })
    }
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


const getStock = async (req, res, next) => {
  const locationStock = await IngredientStock.findAll({ where: { location_id: LOCATION_ID } })
  res.send({ ingredient_count: locationStock.length, ingredient_stocks: locationStock })
}