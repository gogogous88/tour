// modules for server
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// server configurations
const serverConfigs = require("./config/serverConfig");

// connect to database
mongoose.connect(serverConfigs.DBURL);

// initialize express
const app = express();

// apply express configs
require("./backend/express")(app, serverConfigs);

//mark added to force all http point to https on process.env enviroment:
app.use(function(req, res, next) {
  var sslUrl;

  if (
    process.env.NODE_ENV === "production" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    sslUrl = ["https://www.tourgai.com", req.url].join("");
    return res.redirect(sslUrl);
  }

  return next();
});

// fire up the server
app.listen(serverConfigs.PORT, "0.0.0.0", error => {
  if (error) throw error;
  console.log("Server running on port: " + serverConfigs.PORT);
});
