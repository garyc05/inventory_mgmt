const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001

console.log(`Running Application For Location ID: ${process.env.LOCATION_ID}`)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Mount the API Routes
require('./app/api/routes')(app)


app.listen(PORT, () => {
  console.log(`App Server Listening at http://localhost:${PORT}`)
})
