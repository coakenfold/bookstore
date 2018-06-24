/* eslint-disable no-console */
const PORT = process.env.PORT || 3000
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
var helmet = require('helmet')

const options = {
  key: fs.readFileSync(__dirname + '/src/server/server.key'),
  cert: fs.readFileSync(__dirname + '/src/server/server.crt'),
  ca: fs.readFileSync(__dirname + '/src/server/server.csr'),
}
const app = express()

app.disable('x-powered-by')
app.use(helmet())

app.use(express.static(path.join(__dirname, 'build')))

app.get('/api', (req, res) => {
  console.log('Route: /api')
  res.status(200).json({ status: '/api' })
})

// Route '/' caught by static dir: build/index.html
/*app.get('/', (req, res) => {
  console.log('Route: /')
  res.sendFile(path.resolve(__dirname, 'src/server/index.html'))
})*/

spdy.createServer(options, app).listen(PORT, error => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log(`!!! Client running at https://localhost:${PORT}`)
  }
})
