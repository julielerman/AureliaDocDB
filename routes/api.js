var express = require('express');
var router = express.Router();
//var DocumentDBClient = require('documentdb').DocumentClient;
var DocumentDBClient = require('documentdb-q-promises').DocumentClientWrapper;

var config = require('../config');
var Ninjas = require('../models/ninjas.js');
var DocDbDao = require('../models/docDbDao.js');
var docDbClient = new DocumentDBClient(config.host, {
  masterKey: config.authKey
});
var docDbDao = new DocDbDao(docDbClient, config.databaseId, config.collectionId);
var ninjas = new Ninjas(docDbDao);
docDbDao.init();

router.get('/', function(req, res) {
  res.redirect('/app/');
});

router.get('/ninjas', function(req, res) {
  res.redirect('/app/ninjaList');
});
router.get('/api/ninjas', function(req, res) {
 ninjas.getNinjas(req, res);
});

router.get('/api/ninjas/:id', function(req, res) {
 ninjas.getNinja(req, res);
});

router.post('/api/updateDetails', function(req,res){
  ninjas.updateDetails(req,res);
});

module.exports = router;
