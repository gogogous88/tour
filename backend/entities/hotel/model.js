const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new Schema({
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

const HotelRsvpSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  userName: String,
  email: String,
  ph_no: Number,
  hotel: {
    id: Number,
    name: String,
    lat: Number,
    lng: Number,
    rate: String
  },
  detail: {
    rdate: Array,
    amount: Number,

    desc: String
  },
  createDate: Date
});

module.exports = mongoose.model("hotels", HotelSchema);
module.exports = mongoose.model("hotelRsvp", HotelRsvpSchema);
