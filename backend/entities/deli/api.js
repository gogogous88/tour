require("./model");

const mongoose = require("mongoose");
const Deli = mongoose.model("delis");

const deliAPI = app => {
  app.get("/api/delis", (req, res) => {
    Deli.find({}).then(allDelis => {
      res.send(allDelis);
    });
  });
};

module.exports = deliAPI;
