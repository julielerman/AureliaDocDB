var config = {}

config.host = process.env.HOST || "https://msdndatapoints.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "XN288CuHCsGn/wghvQMSUdSGGg2bu9vYhqJOopOnwa9Fj+fqSmofSzt7xR8C35jEeeEe3HaGCvSNLdo24e5BjQ==";
config.databaseId = "Ninjas";
config.collectionId = "Ninjas";

module.exports = config;