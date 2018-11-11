const express = require('express')
const router = express.Router()
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

router.get('/', requireAuth, (req, res) => {
  res.send('all users')
})

module.exports = router
