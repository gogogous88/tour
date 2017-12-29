require("./model");

const mongoose = require("mongoose");

const Attr = mongoose.model("attrs");

module.exports = app => {
  app.get("/api/attrs", async (req, res) => {
    const attrs = await Attr.find({});
    res.send(attrs);
  });
};
