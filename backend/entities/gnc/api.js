const mongoose = require("mongoose");
require("./model");
const GNC = mongoose.model("gnc");

module.exports = app => {
  app.post("/api/gnc", async (req, res) => {
    const { name, desc, img } = await req.body;
    const newGNC = await GNC({ name, desc, img });
    newGNC.save();
    res.json(newGNC);
  });
  app.get("/api/gnc", async (req, res) => {
    const result = await GNC.find({});
    res.json(result);
  });
};
