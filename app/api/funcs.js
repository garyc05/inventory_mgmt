const { 
  sequelize, 
  Location, 
  Staff, 
  Role, 
  Ingredient, 
  Recipe, 
  RecipeContent, 
  ModifiableIngredient, 
  Allergens, 
  MenuItem,
  IngredientStock,
  Sale,
  StockAudit
} = require('./models')

const locationId = 1


const acceptDelivery = async () => {

  // Check user role first


  const result = await sequelize.transaction(async (t) => {

    // Add stock per ing

    // Update audit trail
  })


  // Check user role

  //await IngredientStock.update({ unit_count: 10 }, { where: { ingredient_id: 4, location_id: locationId } })

  //await IngredientStock.addStock(locationId, 4, 25)

  //const i = await IngredientStock.stockValue(locationId)    //.findOne({ where: {location_id: locationId, ingredient_id: 4}, include: Ingredient })
  //console.log(i)

  // Update audit trail
}


const makeSale = async () => {
  // Check user role

  const result = await sequelize.transaction(async (t) => {

    // Get menu item

    // Check stock levels

    // (deal with modifiers)

    // Create Sale item

    // Update audit trail
    
  })

  // Check menu item available at location
  //const menuItem = await MenuItem.findOne({ where: { location_id: locationId, recipe_id: 1 } })

  // Check stock level for ing of recipe 


  // Check for modifiers in sale and get additional price
  // Get cost price from recipe ing


  //const cost = await RecipeContent.costPrice(4)
  //console.log(cost)

/*   const recipe = await Recipe.findOne({ where: { id: 1 }, include: [{ model: RecipeContent, include: [Ingredient] }] })
  for(let i of recipe.RecipeContents){
    console.log(i.Ingredient)
  } */


  //const staffMember = await Staff.findOne({ where: { id: 10 }, include: Role })
  const staffMember = await Staff.findByPk(10)
  console.log(await staffMember.canMakeSale())
  console.log(await staffMember.canAcceptDelivery())
/*   for(let role of roles){
    console.log(role.name)
  } */

  // Create Sale item
/*   await Sale.create({
    staff_id: 1,
    recipe_id: 1,
    location_id: 1,
    sale_price: 11.99,
    cost_price: 7.50
  }) */

  // Update audit trail
/*   await StockAudit.saleAudit({
    staff_id: 1,
    ingredient_id: 1,
    location_id: 1,
    unit_change: 20
  }) */
}


const stockCheck = async () => {

  // Update location stock
  // Update audit trail
}


acceptDelivery().then(() => console.log('Done'))

