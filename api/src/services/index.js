// const AdministratorsService = require('./AdministratorsService');
// const AuthService = require('./AuthService');
// const ChatsService = require('./ChatsService');
// const CommunicationsService = require('./CommunicationsService');
// const CondominiumsService = require('./CondominiumsService');
// const IssuesService = require('./IssuesService');
// const MaintainersService = require('./MaintainersService');
// const NotificationsService = require('./NotificationsService');
// const PostsService = require('./PostsService');
// const PropertiesService = require('./PropertiesService');
// const RemindersService = require('./RemindersService');
//const UsersService = require("./UsersService");
const DBService = require("./DBService");
//const AgenciesService = require("./AgenciesService.js");
// const StorageService = require('./StorageService');
// const database = require('./database');
const logger = require("../logger");

function init() {
  DBService.init(); //Initializes database connection to Mongo
  // RemindersService.init();
  logger.info("Services initialized");
}

module.exports = {
  // AdministratorsService,
  // AuthService,
  // ChatsService,
  // CommunicationsService,
  // CondominiumsService,
  // IssuesService,
  // MaintainersService,
  // NotificationsService,
  // PostsService,
  // PropertiesService,
  // RemindersService,
  // UsersService,
  // DBService,
  // AgenciesService,
  // SystemService,
  // StorageService,
  init,
};
