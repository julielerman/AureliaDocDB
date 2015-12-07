var config = {}

config.host = process.env.HOST || "https://YOURDOCUMENTDBACCOUNTNAME.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "THE MASTER KEY FOR YOUR DOCUMENTDB ACCOUNT";
config.databaseId = "Ninjas";
config.collectionId = "Ninjas";

module.exports = config;