const { Client } = require("pg")
const express = require("express")
const app = express()
const port = 4001


const client = new Client({
  password: "password",
  user: "user",
  host: "postgres",
})


app.get('/test', async (req, res, next) => {
  await client.connect()
  const result = client.query("select current_date")
  
  res.setHeader("Content-Type", "application/json")
  res.status(200)
  res.send(JSON.stringify(result))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
