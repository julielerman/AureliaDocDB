var DocumentDBClient = require('documentdb').DocumentClient;
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

    init: function (callback) {
        var self = this;

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                callback(err);

            } else {
                self.database = db;
                docdbUtils.getOrCreateCollection(self.client, sel.database._self, self.collectionId)
                    .then(function (coll) {
                        self.collection = coll;
                    }, function (err) {
                        return err;
                    });
                // docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                //     if (err) {
                //         callback(err);

                //     } else {
                //         self.collection = coll;
                //     }
                // })

                ;
            }
        });
    },

    find: function (querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
    },

    addItem: function (item, callback) {
        var self = this;

        item.date = Date.now();
        item.completed = false;

        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                callback(null, doc);
            }
        });
    },

    updateItem: function (item, callback) {
        var self = this;

        self.getItem(item.Id, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                doc.Clan = item.Clan;
                doc.Name = item.Name;
                doc.ServedInOniwaban = item.ServedInOniwaban;
                doc.DateOfBirth = item.DateOfBirth;
                doc.DateModified = Date.now();
                self.client.replaceDocument(doc._self, doc, function (err, replaced) {
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, replaced);
                    }
                });
            }
        });
    },

    getItem: function (itemId, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results[0]);
            }
        });
    }
};