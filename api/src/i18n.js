const i18n = require("i18n");
const path = require("path");

/**
 * configure shared state
 */
i18n.configure({
  locales: ["en", "it"],
  directory: path.join(__dirname, "/locales"),
  defaultLocale: "it",
  objectNotation: true,
});

module.exports = i18n;
