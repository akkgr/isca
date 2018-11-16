const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { handleError } = require('../controllers/base')

router.post('/', async (req, res) => {
  const db = require('../db').getDb()
  const data = await db
    .collection('users')
    .findOne({ username: req.body.username, password: req.body.password })
  if (data) {
    const token = jwt.sign(
      {
        id: data._id,
        username: data.username,
        fullname: data.username
      },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '8h',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
      }
    )
    res.json({ token })
  } else {
    handleError(res, 401, 'Invalid username or password.')
  }
})

module.exports = router
