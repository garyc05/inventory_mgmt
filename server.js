const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/test', async (req, res, next) => {
  await client.connect()
  const result = client.query("select current_date")
  
  res.setHeader("Content-Type", "application/json")
  res.status(200)
  res.send(JSON.stringify(result))
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
