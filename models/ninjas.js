var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function Ninjas(docDbDao) {
  this.docDbDao = docDbDao;
  this.List = '';

}

module.exports = Ninjas;

Ninjas.prototype = {


  getNinjas: function (req, res) {
    var self = this;
    var q = '';
    if (req.query.q != "undefined" && req.query.q > "") {
      q = ' WHERE CONTAINS(ninja.Name,"' + req.query.q + '")';
    }

    var querySpec = {
      query:
      'SELECT ninja.id, ninja.Name,ninja.ServedInOniwaban,ninja.DateOfBirth FROM ninja'
      + q
    };

    self.docDbDao.find(querySpec, function (err, items) {
      if (err) {
        // TODO: err handling
      } else {
        res.json(items);
      }
    })
  },


  getNinja: function (req, res) {
    var self = this;
    self.docDbDao.getItem(req.params.id, function (err, items) {
      if (err) {
        // TODO: err handling
      } else {
        res.json(items);
      }
    })

  },



  updateDetails: function (req, res) {
    var self = this;
    var ninja = req.body;
    self.docDbDao.updateItem(ninja, function (err) {
      if (err) {
        throw (err);
      } else {
        res.send(200);
      }
    })
  },


};