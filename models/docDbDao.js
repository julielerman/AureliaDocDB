var DocumentDBClient = require('documentdb-q-promises').DocumentClientWrapper;

var docdbUtils = require('./docdbUtils');

function docDbDao(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.collection = null;


}

module.exports = docDbDao;

docDbDao.prototype = {

<<<<<<< HEAD
        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db,callback) {
            if (err) {
                callback(err);
=======
    init: function () {
        var self = this;
>>>>>>> JuliePrivateWithKeys

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId)
            .then(function (db) {
                self.database = db;
<<<<<<< HEAD
                docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll,callback) {
                    if (err) {
                        callback(err);

                    } else {
=======
                docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId)
                    .then(function (coll) {
>>>>>>> JuliePrivateWithKeys
                        self.collection = coll;
                    }, function (err) {
                        return err;
                    });
            },
            function (err) {
                return err;
            });

        ;
    }
    ,

    find: function (querySpec) {
        var self = this;

<<<<<<< HEAD
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results,callback) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
=======
        return self.client.queryDocuments(self.collection._self, querySpec).toArrayAsync()
            .then(function (results) {
                return results.feed;
            },
            function (err) {
                return err;
>>>>>>> JuliePrivateWithKeys
            }
            )
    }
    ,

    addItem: function (item, callback) {
        var self = this;

        item.date = Date.now();
        item.completed = false;

        self.client.createDocument(self.collection._self, item, function (err, doc,callback) {
            if (err) {
                callback(err);

            } else {
                callback(null, doc);
            }
        });
    },

    updateItem: function (item) {
        var self = this;
        //replaceDocument was repleced with upsert feature for Node (& other) DocDB SDKs
        //no longer need to get doc first in order to use _self
        var docLink = "dbs/Ninjas/colls/Ninjas";

        item.DateModified = Date.now();

        //upsert takes ID from item. be sure property name is same as db (even casing)
        return self.client.upsertDocumentAsync(docLink, item).then(function (replaced) {
            return replaced;
        },
            function (err) {
                return err;
            }
        );
    },


    getItem: function (itemId) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        return self.client.queryDocuments(self.collection._self, querySpec).toArrayAsync()
            .then(function (results) {
                return results.feed[0];
            },
            function (err) {
                return err;
            }
            );
    }
};