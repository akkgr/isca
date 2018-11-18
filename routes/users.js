const express = require('express')
const router = express.Router()
const passport = require('passport')
const Joi = require('joi')
const { handleError } = require('../controllers/base')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

const schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  lastname: Joi.string()
    .min(3)
    .max(30)
    .required(),
  firstname: Joi.string()
    .min(3)
    .max(30)
    .required()
})

router.get('/', requireAuth, async (req, res) => {
  const db = require('../db').getDb()
  const data = await db
    .collection('users')
    .find({})
    .toArray()
  res.json(data)
})

router.post('/', requireAuth, async (req, res) => {
  const db = require('../db').getDb()
  const check = Joi.validate(req.body, schema)
  if (check.error) {
    handleError(
      res,
      400,
      check.error.details
        .map(function(item) {
          return item.message
        })
        .join('\n\r')
    )
  }

  let user = {
    ...req.body,
    inserted: new Date(),
    insertedBy: req.user.username
  }
  await db.collection('users').insertOne(user)
  res.json(user)
})

module.exports = router
