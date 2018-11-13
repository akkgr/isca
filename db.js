require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let _db
let client

function initDb(callback) {
  client = new MongoClient(process.env.MONGO_URI)
  client.connect(function connected(err) {
    if (err) {
      return callback(err)
    }
    _db = client.db(process.env.MONGO_DB)
    console.log('DB initialized - connected to: ' + process.env.MONGO_DB)
    return callback(null, client, _db)
  })
}

function getDb() {
  return _db
}

module.exports = {
  getDb,
  initDb
}
