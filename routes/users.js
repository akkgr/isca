const express = require('express')
const router = express.Router()
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

router.get('/', async (req, res) => {
  const db = require('../db').getDb()
  const data = await db
    .collection('users')
    .find({})
    .toArray()
  res.json(data)
})

module.exports = router
