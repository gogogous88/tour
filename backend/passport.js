/**
 * module dependencies for passport configuration
 */
const passport = require("passport");
const mongoose = require("mongoose");

const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GITHUB_CLIENT_ID = require("../config/credentials").GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = require("../config/credentials")
  .GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = require("../config/credentials")
  .GITHUB_CALLBACK_URL;
const keys = require("../config/credentials");

// controllers
const getUser = require("./entities/user/controller").getUser;
const signInViaGithub = require("./entities/user/controller").signInViaGithub;

/**
 * passport configuration
 */
const User = mongoose.model("user");

const passportConfig = app => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    getUser(id).then(
      user => {
        done(null, user);
      },
      error => {
        done(error);
      }
    );
  });

  // github strategy for passport using OAuth
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
        scope: "user:email"
      },
      (accessToken, refreshToken, gitProfile, done) => {
        signInViaGithub(gitProfile).then(
          user => {
            console.log("got the user");
            done(null, user);
          },
          error => {
            console.log("something error occurs");
            done(error);
          }
        );
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          username: profile.emails[0].value,
          avatarUrl: profile._json.image.url
        }).save();
        done(null, user);
      }
    )
  );
};

module.exports = passportConfig;
