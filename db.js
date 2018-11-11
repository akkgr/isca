require('dotenv').config()
const client = require('mongodb').MongoClient

let _db

function initDb(callback) {
  if (_db) {
    console.warn('Trying to init DB again!')
    return callback(null, _db)
  }
  client.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
    connected
  )
  function connected(err, db) {
    if (err) {
      return callback(err)
    }
    console.log(
      'DB initialized - connected to: ' +
        config.db.connectionString.split('@')[1]
    )
    _db = db
    return callback(null, _db)
  }
}

function getDb() {
  return _db
}

module.exports = {
  getDb,
  initDb
}
