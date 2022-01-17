let config = {
  // host: process.env.MONGO_URI || "localhost",
  // port: process.env.MONGO_PORT || 27017,
  // dbName: process.env.MONGO_DB || "proxim",

  MONGO_HOST: process.env.MONGO_URI || "localhost", // local
  // MONGO_HOST: 'mongo', // docker
  MONGO_PORT: process.env.MONGO_PORT || "27017",
  // MONGO_DB_NAME: process.env.MONGO_DB_NAME || "proxim",
  MONGO_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  MONGO_PWD: process.env.MONGO_PWD,
  MONGO_USR: process.env.MONGO_USR || "root",
  MONGO_AUTH: process.env.MONGO_AUTH || "admin",
  MONGO_FULL_URL: process.env.MONGO_FULL_URL,
  MAX_TRIES: 10,
  DELAY_AFTER_DB_CONNECTION_TRY: 2000,
  options: null,
  secret: null,
};

if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  config.MONGO_DB_NAME = process.env.MONGO_DB_NAME || "domi";
} else if (process.env.NODE_ENV == "test") {
  config.MONGO_DB_NAME = process.env.MONGO_DB_NAME_TEST || "domi-test";
} else if (process.env.NODE_ENV == "production") {
  config.MONGO_DB_NAME = process.env.MONGO_DB_NAME_PROD || "domi";
}

module.exports = config;
