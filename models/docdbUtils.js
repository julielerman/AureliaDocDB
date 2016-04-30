var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper
    , Q = require("q");

var DocDBUtils = {

    getOrCreateDatabase: function (client, databaseId) {

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

         return client.queryDatabases(querySpec).toArrayAsync().then(function (results) {
            if (results.length === 0) {
                var databaseSpec = {
                    id: databaseId
                };

                client.createDatabaseAsync(databaseDefinition)
                    .then(function (databaseResponse) {
                        database = databaseResponse.resource;
                        return client.createCollectionAsync(database._self, collectionDefinition);
                    })
                    .then(function (collectionResponse) {
                        collection = collectionResponse.resource;

                        return client.createDocumentAsync(collection._self, documentDefinition);
                    })
                    .then(function (documentResponse) {
                        var document = documentResponse.resource;
                        console.log('Created Document with content: ', document.content);
                    })
                    .fail(function (error) {
                        console.log("An error occured", error);
                    })
            }
            return results.feed[0];
        },
            function (err) { return err; }
        );    

    },

    getOrCreateCollection: function (client, databaseLink, collectionId) {

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };

        return client.queryCollections(databaseLink, querySpec).toArrayAsync().then(function (results) {

            if (results.length === 0) {
                var collectionSpec = {
                    id: collectionId
                };

                var requestOptions = {
                    offerType: 'S1'
                };

                client.createCollection(databaseLink, collectionSpec, requestOptions, function (err, created) {
                    return created;
                });

            } else {
                return results.feed[0];
            }
        },
            function (err) { return err; }
        );
    }
};

module.exports = DocDBUtils;