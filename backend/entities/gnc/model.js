const mongoose = require("mongoose");
const { Schema } = mongoose;

const GNCSchema = Schema({
  name: String,
  desc: String,
  img: String
});

module.exports = mongoose.model("gnc", GNCSchema);
