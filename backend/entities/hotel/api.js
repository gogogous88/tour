require("./model");

const mongoose = require("mongoose");
const Hotel = mongoose.model("hotels");

module.exports = app => {
  app.get("/api/all/hotels", async (req, res) => {
    const allHotels = await Hotel.find({});
    res.json(allHotels);
  });
};
