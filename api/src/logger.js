const { transports, createLogger, format } = require("winston");

const logger = createLogger({
  level:
    process.env.NODE_ENV == "production"
      ? process.env.LOGGER_LEVEL_PROD || "info"
      : process.env.LOGGER_LEVEL_DEV || "silly",
  format: format.combine(format.colorize(), format.timestamp(), format.json()),
  defaultMeta: { service: "proxim-api" },
  transports: [
    new transports.File({
      filename: process.env.LOGGER_FILENAME_ERROR || "error.log",
      level: "error",
      timestamp: true,
    }),
    new transports.File({
      filename: process.env.LOGGER_FILENAME_COMBINED || "combined.log",
      maxsize: process.env.LOGGER_MAXSIZE || 5242880, // 5MB
      maxFiles: process.env.LOGGER_MAXFILES || 7,
      timestamp: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      handleExceptions: true,
      colorize: true,
      prettyPrint: true,
      timestamp: true,
    })
  );
}

module.exports = logger;
