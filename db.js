require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let _db

function initDb(callback) {
  const client = new MongoClient(process.env.MONGO_URI)
  client.connect(function connected(err) {
    if (err) {
      return callback(err)
    }
    _db = client.db(process.env.MONGO_DB)
    console.log('DB initialized - connected to: ' + process.env.MONGO_DB)
    return callback(null, _db)
  })
}

function getDb() {
  return _db
}

module.exports = {
  getDb,
  initDb
}
