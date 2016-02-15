/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import co from 'co';
import MongoClient from 'mongodb';
import expressMongoDb from 'express-mongo-db';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
// TODO: parameterize database name and maybe host
var databaseUrl = 'mongodb://localhost/gameoflifejavascript-dev';
app.use(expressMongoDb(databaseUrl));
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

var indexesCreation = co(function*() {
  console.log("Indexes creation");
  var db = yield MongoClient.connect(databaseUrl);
  var planes = db.collection('planes');
  var indexName = yield planes.ensureIndex({name: 1}, {unique: true});
  console.log("Ensured index " + indexName);
});

// Start server
function listen() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

function startServer() {
  listen();
}

setImmediate(function() {
  indexesCreation.then(startServer);
});

// Expose app
exports = module.exports = app;
