/* eslint-disable no-console */
const spdy = require('spdy')
const express = require('express')
const fs = require('fs')
//const path = require('path')
const PORT = process.env.PORT || 5000
const cors = require('cors')

const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt'),
  ca: fs.readFileSync(__dirname + '/server.csr'),
}

const app = express()
var helmet = require('helmet')
app.use(helmet())
app.disable('x-powered-by')
app.get('/', cors(), (req, res) => {
  res.status(200).json({ status: 'connected' })
})

spdy.createServer(options, app).listen(PORT, error => {
  if (error) return process.exit(1)
  console.log(`!!! Server running at https://localhost:${PORT}`)
})
