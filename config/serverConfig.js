/**
 * module dependencies for server configuration
 */
const path = require("path");
const databaseUrl = require("./credentials").DBURL;

/**
 * server configurations
 */
const serverConfigs = {
  PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 5000,
  ROOT: path.resolve(__dirname, ".."),
  DBURL: process.env.MONGO_URI
};

module.exports = serverConfigs;
