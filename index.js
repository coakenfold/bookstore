/* eslint-disable no-console */
const spdy = require('spdy')
const express = require('express')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3000

const options = {}

const app = express()
var helmet = require('helmet')
app.use(helmet())
app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '/src/public')))
app.get('/', (req, res) => {
  res.status(200).render('/src/public/index.html')
})

spdy.createServer(options, app).listen(PORT, error => {
  if (error) return process.exit(1)
  console.log(`!!! Client running at https://localhost:${PORT}`)
})
