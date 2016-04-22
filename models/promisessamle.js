client.createDatabaseAsync(databaseDefinition)
    	.then(function(databaseResponse) {
        	database = databaseResponse.resource;
        	return client.createCollectionAsync(database._self, collectionDefinition);
    	})
    	.then(function(collectionResponse) {
        	collection = collectionResponse.resource;
        
        	return client.createDocumentAsync(collection._self, documentDefinition);
    	})
		.then(function(documentResponse) {
			var document = documentResponse.resource;
			console.log('Created Document with content: ', document.content);
		})
    	.fail(function(error) {
        	console.log("An error occured", error);
    	});