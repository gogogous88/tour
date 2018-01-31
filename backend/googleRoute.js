//虽然命名了google,但uber oauth也在这里了

const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("back");
    }
  );

  app.get("/auth/uber", passport.authenticate("uber", { scope: ["profile"] }));

  app.get(
    "/auth/uber/callback",
    passport.authenticate("uber", { failureRedirect: "/login" }),
    function(req, res) {
      res.redirect("back");
    }
  );
};
