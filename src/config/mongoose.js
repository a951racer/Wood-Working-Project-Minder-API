//const config = require('./config');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

module.exports = function() {
  mongoose.Promise = global.Promise;
  let conn_string = 'mongodb://';
  conn_string += process.env.DB_USER + ':';
  conn_string += process.env.DB_PASSWORD + '@';
  conn_string += process.env.DB_CLUSTER + '/';
  conn_string += process.env.DB_NAME + '?';
  conn_string += process.env.DB_OPTIONS;
  const db = mongoose.connect(conn_string, {
      useMongoClient: true
  });

  require('../models/userModel');
  require('../models/projectModel');
  console.log('connected')
  return db;
};
