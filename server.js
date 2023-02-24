require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001

console.log(`Running Application For Location ID: ${process.env.LOCATION_ID}`)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Mount the API Routes
require('./app/api/routes')(app)


// Simple catch-all middleware to ensure un-caught errors return a response rather than hang
app.use((error, req, res, next) => {
  if(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
  next()
})


app.listen(PORT, () => {
  console.log(`App Server Listening at http://localhost:${PORT}`)
})
