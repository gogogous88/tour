const passport = require("passport");
const signIn = require("./controller").signIn;
const getFullProfile = require("./controller").getFullProfile;
const updateFullProfile = require("./controller").updateFullProfile;
const getAllUsers = require("./controller").getAllUsers;

/**
 * user apis
 */
const userAPI = app => {
  // get authenticated user
  app.get("/api/user/getUser", (req, res) => {
    if (req.user) res.send(req.user);
    else res.send(null);
  });

  // github authentication route
  app.get("/api/user/authViaGitHub", passport.authenticate("github"));

  // callback route from github
  app.get(
    // this should match callback url of github app
    "/api/user/authViaGitHub/callback",
    passport.authenticate("github", { failureRedirect: "/signIn/failed" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  //google-oauth-added-by-mark

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  //uber oauth

  app.get("/auth/uber", passport.authenticate("uber", { scope: ["profile"] }));

  app.get(
    "/auth/uber/callback",
    passport.authenticate("uber", { failureRedirect: "/login" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  // signout the user
  app.get("/api/user/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // get user full profile
  app.get("/api/user/profile/:username", (req, res) => {
    getFullProfile(req.params.username).then(
      result => {
        res.send(result);
      },
      error => {
        res.send({ error });
      }
    );
  });

  //update users username info by mark
  app.post("/api/user/profile/:username", (req, res) => {
    const { name, level, location, pos } = req.body;

    updateFullProfile(req.params.username, name, level, location, pos).then(
      result => {
        res.send(result);
      },
      error => {
        res.send({ error });
      }
    );
  });

  //get all users by mark
  app.get("/api/user/getAllUser", async (req, res) => {
    const result = await getAllUsers();
    if (result) res.json(result);
    else res.send(null);
  });
};

module.exports = userAPI;
