const mongoose = require("mongoose");

require("./model");
const Profile = mongoose.model("profile");

module.exports = app => {
  app.get("/api/profile", async (req, res) => {
    const result = await Profile.find({});
    res.json(result);
  });
  app.post("/api/profile", async (req, res) => {
    const { exp } = await req.body;
    const newProfile = await new Profile({ exp });
    newProfile.save();
    res.json(newProfile);
  });
};
