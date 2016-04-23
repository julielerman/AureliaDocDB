var DocumentDBClient = require('documentdb-q-promises').DocumentClientWrapper;
//var DocumentDBClient = require('documentdb').DocumentClient;

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

    self.docDbDao.find(querySpec)
       .then(function (items) {
     
        return res.json(items);
      },
      function(err){return err;}
    ) }
 ,


  getNinja: function (req, res) {
    var self = this;
    self.docDbDao.getItem(req.params.id)
    .then(function (items) {
     return res.json(items);
      },
      function(err){return err;}
    )

  },



  updateDetails: function (req, res) {
    var self = this;
    var ninja = req.body;
    self.docDbDao.updateItem(ninja).then( function () {
      
       //deprecated: res.send(200);
       res.status(200).end();
      },
            function (err) {
                return err;
            }
    )
  },


};