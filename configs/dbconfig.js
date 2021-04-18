const DB_USER = process.env.MONGODB_USER
const DB_PASSWORD = process.env.MONGODB_PASSWORD
const DB_NAME = process.env.MONGODB_NAME
const DB_PROVIDER = process.env.MONGODB_PROVIDER

const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_PROVIDER}/${DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect()

module.exports = client