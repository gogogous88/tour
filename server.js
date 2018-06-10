// modules for server
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// server configurations
const serverConfigs = require('./config/serverConfig');

// connect to database
mongoose.connect(serverConfigs.DBURL);

// initialize express
const app = express();

//mark added to force all http point to https on process.env enviroment:
if (process.env.NODE_ENV === 'production') {
  // only redirect in prod
  app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https')
      res.redirect(['https://', req.get('Host'), req.url].join(''));
    else next();
  });
}

// apply express configs
require('./backend/express')(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, '0.0.0.0', error => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
