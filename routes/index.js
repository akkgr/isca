const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile, handleError } = require('../controllers/base')

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
// router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter(file => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth'
    ? router.use(`/api/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/api', (req, res) => {
  res.send('API Home')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  handleError(res, 404, 'NOT_FOUND')
})

module.exports = router
