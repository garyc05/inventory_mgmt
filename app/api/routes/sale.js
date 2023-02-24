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



// Exports the router with attached middleware and endpoint handler(s)
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

  // Handling just a single item in the sale request body currently
  const menuItem = await MenuItem.findOne({ where: { recipe_id: data.recipe_id, location_id: LOCATION_ID } })


  // Also handling only a single modified ingredient
  let modifierPrice = 0 
  if(data.modified_ingredient){
    if(!menuItem.modifiable){
      return res.status(422).send({ message: `Recipe ${data.recipe_id} cannot be modified @ Location ${LOCATION_ID}` })
    }
    const modifier = await ModifiableIngredient.findByName(data.modified_ingredient)
    modifierPrice = modifier?.price ?? 0
  }


  const tResult = await sequelize.transaction(async (t) => {
    
    const haveStock = await IngredientStock.haveRequiredStock(data.recipe_id, LOCATION_ID)
    // Not checking modified ingredient stock, but we really should

    if(haveStock){
      await Sale.create({
        staff_id: staffMember.id,
        recipe_id: data.recipe_id,
        location_id: LOCATION_ID,
        sale_price: menuItem.price + modifierPrice,
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