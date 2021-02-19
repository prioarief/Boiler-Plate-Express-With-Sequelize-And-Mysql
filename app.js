require('dotenv').config()
require('./src/configs/database')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.APP_PORT || 3000


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/v1', require('./src/routes'))


app.listen(port, () => console.log('server running on port ', port))

