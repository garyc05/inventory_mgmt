const { 
  sequelize, 
  Sale, 
  ModifiableIngredient, 
  MenuItem,
  IngredientStock,
  StockAudit
} = require('../models')

const { staffValidator } = require('./middleware')

const LOCATION_ID = process.env.LOCATION_ID

module.exports = () => {
  const router = require('express-promise-router')()

  router.post('/', staffValidator, makeSale)
  return router
}


const makeSale = async (req, res, next) => {
  const { data } = req.body
  const { staffMember } = res.locals

  const canSell = await staffMember.canMakeSale()
  if(!canSell){
    return res.status(400).send({ message: `${staffMember.name} cannot make sales` })
  }

  const tResult = await sequelize.transaction(async (t) => {
    // Handling just a single item in the sale request body currently
    const menuItem = await MenuItem.findOne({ where: { recipe_id: data.recipe_id, location_id: LOCATION_ID } })
    const haveStock = await IngredientStock.haveRequiredStock(data.recipe_id, LOCATION_ID)

    // TODO MODIFIERS

    if(haveStock){
      await Sale.create({
        staff_id: staffMember.id,
        recipe_id: data.recipe_id,
        location_id: LOCATION_ID,
        sale_price: menuItem.price, // tODO add modifiers
        cost_price: 0 // Leaving cost price as zero since the calculated value does not seem to make any sense
      })
  
      await IngredientStock.reduceStockForRecipe(data.recipe_id, LOCATION_ID)
  
      await StockAudit.addSaleAudit(staffMember.id, data.recipe_id, LOCATION_ID)
    }

    return haveStock

  })

  if(!tResult){
    return res.status(400).send({ message: 'Not enough stock to sell menu item' })
  }

  res.sendStatus(201)
}