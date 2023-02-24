const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001

process.env.LOCATION_ID = 1


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Mount the API Routes
require('./app/api/routes')(app)


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
