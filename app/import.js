require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
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
  IngredientStock
} = require('./api/models')

const sheetId = process.env.GOOGLE_SHEET_ID

const doc = new GoogleSpreadsheet(sheetId)
doc.useApiKey(process.env.GOOGLE_API_KEY)



const dataImport = async () => {

  // TODO, check if data is already imported HERE FIRST

  await doc.loadInfo()

  console.log('Location Data Import...')
  await loadLocations()

  console.log('Staff And Role Data Import...')
  await loadStaff()


  console.log('Ingredient Data Import...')
  await loadIngredients()

  console.log('Recipe Data Import...')
  await loadRecipes()


  console.log('Menu Modifiers Data Import...')
  await loadModifiers()


  console.log('Menu Items Data Import...')
  await loadMenuItems()


  await setLocationStock()
}

const sheetRowsByTitle = (title) => {
  const sheet = doc.sheetsByTitle[title]
  return sheet.getRows({ offset: 0 })
}


const loadLocations = async () => {
  const rows = await sheetRowsByTitle('locations')
  await Promise.all(rows.map((row) => {
    Location.create({ id: row.location_id, name: row.name, address: row.address })
  }))
}


const loadStaff = async () => {
  const rows = await sheetRowsByTitle('staff')
  for(let row of rows) {
    const [staffMember, created] = await Staff.findOrCreate({ 
      where: {
        id: row.staff_id,
        name: row.name,
        dob: row.dob,
        iban: row.iban,
        bic: row.bic
      }
    })

    if(created) {
      const [role, _] = await Role.findOrCreate({ where: { name: row.role } })
      await staffMember.addRole(role)
    }

    const location = await Location.findByPk(row.location_id)
    await staffMember.addLocation(location)

  }

}



const loadIngredients = async () => {
  const rows = await sheetRowsByTitle('ingredients')
  await Promise.all(rows.map((row) => {
    Ingredient.create({ id: row.ingredient_id, name: row.name, unit: row.unit, cost: row.cost })
  }))
}


const loadRecipes = async () => {
  const rows = await sheetRowsByTitle('recipes')
  for(let row of rows){
    const [recipe, _] = await Recipe.findOrCreate({ where: { id: row.recipe_id, name: row.name } })
    await RecipeContent.create({ 
      recipe_id: recipe.id,
      ingredient_id: row.ingredient_id,
      ingredient_quantity: row.quantity 
    })
  }
}


const loadModifiers = async () => {
  const rows = await sheetRowsByTitle('modifiers')
  for(let row of rows){
    if(row.modifier_id == 1){
      const ingredient = await Ingredient.findOne({ where: { name: row.option } })
      await ModifiableIngredient.create({ 
        name: row.option,
        price: row.price,
        ingredient_id: ingredient.id
      })
    } else {
      await Allergens.create({ name: row.option })
    }
  }
}


const loadMenuItems = async () => {
  const rows = await sheetRowsByTitle('menus')
  for(let row of rows){
    const modifiable = row.modifiers == 1
    const has_allergens = row.modifiers == 2
    await MenuItem.create({ 
      recipe_id: row.recipe_id,
      location_id: row.location_id,
      price: row.price,
      modifiable,
      has_allergens
    })
  }
}


const setLocationStock = async () => {

  const nastyQuery = (locationId) => {
    return `select * from ingredients i where id in (
      select ingredient_id from recipe_contents rc where recipe_id in (
        select id from recipes where recipe_id in (
          select recipe_id from menu_items mi where location_id = ${locationId}
        )
      )
    )`
  }

  const locations = await Location.findAll()
  for(let location of locations){
    const query = nastyQuery(location.id)
    const [results, _] = await sequelize.query(query)

    for(let result of results){
      await IngredientStock.create({ ingredient_id: result.id, location_id: location.id })
    }
  }

}



dataImport().then(() => {
  console.log('Done')
}).catch((err) => {
  console.log(err)
})