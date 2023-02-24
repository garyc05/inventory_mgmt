require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { Location, Staff, Role, Ingredient, Recipe, RecipeContent } = require('./api/models')

const sheetId = process.env.GOOGLE_SHEET_ID

const doc = new GoogleSpreadsheet(sheetId)
doc.useApiKey(process.env.GOOGLE_API_KEY)



const dataImport = async () => {

  // TODO, check if data is already imported HERE

  await doc.loadInfo()

  console.log('Location Data Import...')
  await loadLocations()

  console.log('Staff And Role Data Import...')
  await loadStaff()


  console.log('Ingredient Data Import...')
  await loadIngredients()

  console.log('Recipe Data Import...')
  await loadRecipes()
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
    await RecipeContent.create({ recipe_id: recipe.id, ingredient_id: row.ingredient_id, ingredient_quantity: row.quantity })
  }
}



dataImport().then(() => {
  console.log('Done')
}).catch((err) => {
  console.log(err)
})