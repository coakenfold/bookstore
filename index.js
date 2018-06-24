const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'server')))
  .get('/', (req, res) => res.render('server/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
