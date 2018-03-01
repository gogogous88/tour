/**
 * user model
 */
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  avatarUrl: String,
  email: String,
  role: { type: String, default: "user" }, // ['admin', 'moderator', 'user']
  github: {
    id: Number,
    url: String,
    company: String,
    location: String,
    bio: String,
    hireable: Boolean,
    followers: Number,
    following: Number
  },
  googleId: String,
  uberId: String,
  level: String,
  location: String,
  pos: { lat: Number, lng: Number },
  tags: [String],
  photos: { type: Array, default: [] },
  photos1: { type: Array, default: [] },
  photos2: { type: Array, default: [] },
  photos3: { type: Array, default: [] },
  desc: String,
  vehicleTypes: [String],

  contact: String
});

module.exports = mongoose.model("user", userSchema);
