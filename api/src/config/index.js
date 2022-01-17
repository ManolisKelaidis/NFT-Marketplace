const path = require("path");
const pkg = require("../../package.json"); //babel didn't like package variable name
require("dotenv").config();

const config = {
  ROOT_DIR: path.join(__dirname, "/../"),
  URL_PORT: process.env.SERVER_PORT || 3000,
  URL_PATH: "http://localhost",
  BASE_VERSION: "v1",
  CONTROLLER_DIRECTORY: path.join(__dirname, "/../", "controllers"),
  PROJECT_DIR: __dirname + "/../",
  ENVIRONMENT: process.env.NODE_ENV || "development",
  BODY_SIZE: process.env.BODY_SIZE || "20MB",
};

config.OPENAPI_YAML = path.join(config.ROOT_DIR, "openapi.yaml");
//config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
config.FILE_UPLOAD_PATH =
  process.env.FILE_UPLOAD_PATH ||
  path.join(config.PROJECT_DIR, "uploaded_files");
config.FILE_THUMBNAIL_DIMENSIONS = {
  WIDTH: 100,
  HEIGHT: 100,
};

//appIds
config.appIdAdministrator = process.env.APP_ID_ADMINISTRATOR;
config.appIdProxim = process.env.APP_ID_PROXIM;
config.appIdConsumer = process.env.APP_ID_CONSUMER;

const dbConfig = require("./db");
config.db = dbConfig;
const servicesConfig = require("./services");
config.services = servicesConfig;


config.instance = {
  responseVersion: process.env.RESPONSE_VERSION || 5,
  name: process.env.INSTANCE_NAME || pkg.name,
  version: process.env.INSTANCE_VERSION || pkg.version,
};

config.auth = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  saltRounds: (process.env.SALT_ROUNDS) ? parseInt(process.env.SALT_ROUNDS) : 10,
  tokenExpiration: process.env.TOKEN_EXPIRATION || 86400,
  IDP: {
    AA: process.env.IDP_AA == "true" ? true : false,
    CONSOLE_CONFIG: process.env.IDP_CONSOLE_CONFIG == "true" ? true : false,
  },
};

config.auth.keycloak = {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  realm: process.env.KEYCLOAK_REALM,
  serverUrl: process.env.KEYCLOAK_SERVER_AUTH_URL,
  publicKey: `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`, // You can get it from `/auth/admin/master/console/#/realms/proxim/keys`, clicking on public key
  adminUsername: process.env.KEYCLOAK_USER,
  adminPassword: process.env.KEYCLOAK_PASSWORD,
  adminRefresh: process.env.KEYCLOAK_ADMIN_REFRESH || 60,
  adminRealmUsername: process.env.KEYCLOAK_ADMIN_REALM_USERNAME,
  adminRealmPassword: process.env.KEYCLOAK_ADMIN_REALM_PASSWORD,
  targetClientId: process.env.KEYCLOAK_TARGET_CLIENT,
  spidToken: process.env.KEYCLOAK_SPID_TOKEN || 'short'
};

config.s3 = {
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  port: process.env.S3_PORT,
  uri: process.env.S3_URI,
  region: process.env.S3_REGION,
};

config.ses = {
  region: process.env.SES_REGION || process.env.S3_REGION,
  accessKey: process.env.SES_ACCESS_KEY || process.env.S3_ACCESS_KEY,
  secretKey: process.env.SES_SECRET_KEY || process.env.S3_SECRET_KEY,
  sender: process.env.SES_SENDER,
};
config.dontSendEmails = process.env.DONT_SEND_EMAILS == "true" ? true : false;

config.storage = {
  type: process.env.STORAGE_TYPE || "permanent", //we could eventually think of a transient type
  provider: process.env.STORAGE_PROVIDER || "s3",
  groupby: process.env.STORAGE_GROUPBY || "week",
  buckets: {
    files: process.env.STORAGE_BUCKET_FILES,
    docs: process.env.STORAGE_BUCKET_DOCS || process.env.STORAGE_BUCKET_FILES,
    photos:
      process.env.STORAGE_BUCKET_PHOTOS || process.env.STORAGE_BUCKET_FILES,
    videos:
      process.env.STORAGE_BUCKET_VIDEOS || process.env.STORAGE_BUCKET_FILES,
  },
};

config.email = {
  recoverySubject: "PROXIM Recupero Password",
  confirmationSubject: "PROXIM Conferma Email",
  invitationSubject: "PROXIM Invito",
  consumerConfirmUrl:
    process.env.CONSUMER_CONFIRM_URL || "https://scanio-dev.proxim.ai",
  consoleConfirmUrl:
    process.env.PROXIM_CONFIRM_URL || "https://scanio-dev.proxim.ai",
  maintainerConfirmUrl:
    process.env.MAINTAINER_CONFIRM_URL || "<link to console for maintainers>",
  administratorConfirmUrl:
    process.env.ADMINISTRATOR_CONFIRM_URL || "https://scanio-dev.proxim.ai",
  administratorAppConfirmUrl:
    process.env.ADMINISTRATOR_APP_CONFIRM_URL || "<link to app for admin>",
  dontSend: process.env.DONT_SEND_EMAILS == "true" ? true : false,
};

config.smtp = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE == "true" ? true : false,
  sender: process.env.SMTP_SENDER,
};

config.firebase = {
  serviceAccount: {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECTID || "proxim-dev",
    private_key_id:
      process.env.FIREBASE_KEYID || "1a666c75d113bdd31ba230eee0070f3d471476c5",
    private_key:
      process.env.FIREBASE_KEY ||
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCfFHZlRMgx59cd\nvZYDmCTB+cBAu+WPhj/QuP6kZkrVwkJLwYpbql3Wi2IakeDkysv7UdGERLKGfbyJ\n6y8mocdcAQj4OOaDhAQuHCKsJN86GhbmS+4fTNJqBCR51IU1eVvU5lUtSaBp8f3c\niTP7GTIBXHPBb7VQl44NY+lPpk2WW7YdCKa4k19xeGlGbcVUWuVb5lqyKcmFa/aU\nOD2p4yTlad3WG1RmBcKk9SyCzjvUQo/w4SLe8/4NPSt/MjMRwdj81nWs0akJ9NNy\nuNWgUlNtEJIep19Ri9PMUHMc37cJsm0Jx6V28Sosy4GmZgCx49yI5ljcz2U9Ixp4\nYfT1Xd0dAgMBAAECggEABx0bI5wtIk4ucx4ElKnmZZDi5VeBrya0Y9kMn2gToKDM\nkNFZe+U6clr5Ssbgj6/3PzMsHgYUav85wdEf4qe0CovhTXhTQT5TZtx15czK+VuB\nT/samDu54mkdAyBbH0ZgsjyP7TPbAIyEawBCWtAy9EH2IIhQ9gb7oI2p4+3uj51S\n4Aqwp+r3MTtVBYwxL2Og/lI9h4farRvCKpHBEp+jUJ8tEGEPWsNY/ZtQbQcqMgSz\nnPliiEhp4lkF6XTVuVRFz0jr9oEmQ2beNhSiWXcsqxEcqhFDwwU0WSyoIF53mihB\nm//FFGdI58mDmheLqb86w6rC/71TAYqO8SeYC1K14QKBgQDWS/HHpeBDKSvdCm78\nelC4KAp9BSiJBz0WZT/RchFl7RuCWP1azqF8USBJdWF2OmhyKqU7PRuVBpVdBzPK\niQn2Rgw0UsrmVw3x7R6xJaAd8Z1N5jXYQTPilXvJTK3Amw6//SgSVHo6wKhD9RRg\nfpvdPfWRix0xObGa3MO+kBew6wKBgQC+Caxbd7Y3Zw80Vuj/vtTM1BJFLdDXPKGL\niixIbcyRhi5p+EXUr50/9GqbC107mQRAkZ57K3zoqxblUCd6KjQeCSDbm4BndH3q\n34A/qoxnIqlU8oJ9I5fSm5sDhYtp6lekSrKU3dULdMcqvhanxj78AvIPT83qgPox\nBBpDprjoFwKBgQC51fghG38EnvKT6FVhC61uVgLqcgu58RYPktQqDJJ74oflnMhw\n9BnkVfH64hkXzwT+ZG8PlSmTLbdfijxmmjqSYCJ7SYT9BWdpcikYlDlrXjj88fOl\nyr109A75/U38Zjr/UUlrw+iPhL0m2aTHHWSLEw0fHxW8t3yGgIYbfpec6wKBgQCQ\nrvyyhuoMNEK3LpQmYjvR1oQydzdRJ7A2dPRSEIZ3JRmhRIyl6S5nysZ/VJ+fCFjc\ncAGg9PMckWXVILltoUQcugZyLGoOWfqkH5Wc41QSEamqKxh9/eNRTXcvrzT9ZpVj\nWBuui1XwavBX8nF9OsopRHTWg4PazmetedolN4H/8QKBgQC0YoFjbllW19L6nAvn\nYmX3jn0USXl+vM4IRCCZ8kwi/kdFzqrTGE3gAZpZaUxnwWg/qiQIgkhifl3QnGE5\nOxlcrSonxPi6s++BOmfuYVrEoXmpw3szXWB1Vpx3EofWOcGpG6xXmVyjkRurR8VZ\nqm+oj7X96Ep82Wdx/ad+zUA17A==\n-----END PRIVATE KEY-----\n",
    client_email:
      process.env.FIREBASE_EMAIL ||
      "firebase-adminsdk-9od47@scanio-b26da.iam.gserviceaccount.com",
    client_id: process.env.FIREBASE_CLIENTID || "115856977203448125904",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      process.env.FIREBASE_CERTURL ||
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9od47%40scanio-b26da.iam.gserviceaccount.com",
  },
  databaseURL: "https://proxim-dev.firebaseio.com",
};

config.federa = {
  spidUserInfoURL:
    process.env.SPID_USERINFO_URL ||
    "https://mobileauth-test.lepida.it/userdata/read",
  approverUrl: process.env.CONSOLE_URL || "https://reopen.lepida.it",
};

config.notifications = {
  dontSend: process.env.DONT_SEND_NOTIFICATIONS == "true" ? true : false,
  provider: "firebase",
};

config.twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_ACCOUNT_TOKEN,
  senderNumber: process.env.TWILIO_SENDER_PHONE_NUMBER || "+447723443916",
};

config.system = {
  healthCheckSecret: process.env.HEALTHCHECK_SECRET,
};

config.admin = {
  username: process.env.DEFAULT_ADMIN || "admin",
  pwd: process.env.DEFAULT_ADMIN_PASSWORD || "dfjfgfdslkhfs",
  email: process.env.DEFAULT_ADMIN_EMAIL || "somen@one.com",
};

config.kafka = {
  KAFKA_ENABLED: process.env.KAFKA_ENABLED || false,
  KAFKA: {
    schemaRegistry:
      process.env.KAFKA_PROD_SCHEMA ||
      "http://schemaregistry.internal.confluent-kafka.proxim.dev.k8s:8081",
    broker:
      process.env.KAFKA_PROD_BROKER ||
      "broker.internal.confluent-kafka.proxim.dev.k8s:9094",
  },
  KAFKA_LOCAL: {
    schemaRegistry:
      process.env.KAFKA_DEV_SCHEMA ||
      "http://ec2-34-245-24-166.eu-west-1.compute.amazonaws.com:8081",
    broker:
      process.env.KAFKA_DEV_BROKER ||
      "ec2-34-245-24-166.eu-west-1.compute.amazonaws.com:9092",
  },
};

config.USER_TYPES = {
  PROXIM: 1, // proxim
  ADMINISTRATOR: 2, // administrator
  AGENCY: 3, // agency
  CLIENT: 5, // client
  FEDERA: 9, // federa user
  CONSUMER: 10, // consumner (scanio platform)
};

config.TASK_STATUSES = {
  CREATED: "created",
  ASSIGNED: "assigned",
  COMPLETED: "completed",
  SUSPENDED: "suspended",
  CLOSED: "closed",
  PAID: "paid",
};

config.appIDs = {
  PROXIM_CONSOLE: process.env.APP_ID_PROXIM_CONSOLE
};

config.POI_COST = process.env.POI_COST || 0.1;
module.exports = config;
