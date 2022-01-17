// External dependencies

const mongoose = require("mongoose");
const logger = require("../logger");
const config = require("../config");
const repeatPromiseUntilResolved = require("repeat-promise-until-resolved");
const ServerError = require("../error");

const dbConfig = config.db;
const CREDENTIALS = `${dbConfig.MONGO_USR}:${dbConfig.MONGO_PWD}`;
const USERNAME = dbConfig.MONGO_USR;
const USER_PWD = dbConfig.MONGO_PWD;
const MAX_DB_CONNECTION_TRIES = dbConfig.MAX_TRIES;
const DELAY_AFTER_DB_CONNECTION_TRY = dbConfig.DELAY_AFTER_DB_CONNECTION_TRY;

let USER_CREDENTIALS_URI_PART = (USERNAME && USER_PWD) ? `${USERNAME}:${USER_PWD}@` : "";

const URL = `mongodb://${USER_CREDENTIALS_URI_PART}${dbConfig.MONGO_HOST}:${dbConfig.MONGO_PORT}/${dbConfig.MONGO_DB_NAME}?authSource=${dbConfig.MONGO_AUTH}`;

const CONN_HOST = dbConfig.MONGO_FULL_URL ? dbConfig.MONGO_FULL_URL : URL;
logger.info(`mongoDB connection URL; ${CONN_HOST}`);

function mongooseEventListeners() {
  mongoose.connection.on("connected", () => {
    logger.info("Database - Connection status: connected");
  });

  mongoose.connection.on("disconnected", async () => {
    logger.error("Database - Connection status: disconnected");

    await establishDBConnection();
  });

  mongoose.connection.on("error", (e) => {
    logger.error("Database - An error occurred\n", e);
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("Database - Connection status: reconnected");
  });

  mongoose.connection.on("close", () => {
    logger.info("Database - Connection status: close ");
  });
}

async function init() {
  try {
    // connect to database
    await establishDBConnection();

    logger.info(
      `Database - Connection established successfully with database ${CONN_HOST}`
    );

    // set mongoose events listeners
    mongooseEventListeners();
    // create admin user
    //await createProximUser();
  } catch (error) {
    logger.error("Database - Connection did not established\n", error);
    // throw error;
  }
}

async function establishDBConnection() {
  await repeatPromiseUntilResolved(dbConnect, {
    maxAttempts: MAX_DB_CONNECTION_TRIES,
    delay: DELAY_AFTER_DB_CONNECTION_TRY,
    onAttempt: (attempt) => {
      logger.info(`Database - (${attempt}) Trying to connect...`);
    },
    onError: (error, attempt) => {
      logger.error(
        `Database - (${attempt}) Failed to connect \n${error.message}.`
      );
    },
  });
}

async function dbConnect() {
  const connection = await mongoose.connect(CONN_HOST, dbConfig.MONGO_OPTIONS);
  // await mongoose.connection.db.dropCollection("payments");
  // await mongoose.connection.db.dropCollection("tasks");
  // await mongoose.connection.db.dropCollection("poienriched");
  // mongoose.connection.db.dropDatabase();
}

// To fix all deprecation warnings from mongoose-Mongo
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = { 
  init
};
