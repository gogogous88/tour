const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttrSchema = new Schema({
  id: Number,
  name: String,
  lat: Number,
  lng: Number,
  coord: String,
  addr: String,
  addr_coord: String,
  ph_no: String,
  rate: String,
  descr: String,
  img: String,
  category: String,
  location: String,
  class: Number,
  a: String,
  b: String,
  c: String,
  d: String,
  e: String,
  f: String
});

module.exports = mongoose.model("attrs", AttrSchema);
