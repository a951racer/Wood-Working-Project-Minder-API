//const config = require('./config');
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient

module.exports = function() {
  mongoose.Promise = global.Promise
  let conn_string = process.env.MONGO_CONNECT_STRING
  const db = mongoose.connect(conn_string)

  require('../models/userModel')
  require('../models/projectModel')
  require('../models/libraryItemModel')
  require('../models/jobModel')
  require('../models/boardModel')
  require('../models/noteModel')
  require('../models/reportModel')

  console.log('connected')
  return db
};
