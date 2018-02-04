const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = Schema({
  exp: String
});

module.exports = mongoose.model("profile", ProfileSchema);
