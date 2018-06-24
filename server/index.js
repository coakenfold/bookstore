const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Express says: Hello World!'))

app.listen(80, () => console.log('Example app listening on port 80!'))
