require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const rfs = require('rotating-file-stream')

const app = express()

app.set('port', process.env.PORT)

var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log')
})

app.use(morgan('combined', { stream: accessLogStream }))

app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(require('./routes'))

const server = require('http').createServer(app)
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
