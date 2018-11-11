require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
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
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(require('./routes'))

const initDb = require('./db').initDb
initDb(function(err, db) {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        issuer: '',
        audience: '',
        algorithms: ['HS256'],
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      function(jwt_payload, done) {
        db.collection('users').findOne({ id: jwt_payload.sub }, function(
          err,
          user
        ) {
          if (err) {
            return done(err, false)
          }
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      }
    )
  )
  app.listen(process.env.PORT, function(err) {
    if (err) {
      throw err
    }
    console.log('API Up and running on port ' + process.env.PORT)
  })
})
