/**
 * discussion model
 */
const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
  forum_id: mongoose.Schema.ObjectId,
  forum: { type: mongoose.Schema.ObjectId, ref: "forum" },
  discussion_slug: String,
  user_id: mongoose.Schema.ObjectId,
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  date: Date,
  title: String,
  rloc: String,
  ploc: String,
  ph_no: String,
  sup_or_req: String,
  pname: Date,
  pdate: String,
  rdate: Array,
  vehicleType: String,
  content: Object,
  favorites: Array,
  tags: Array,
  pinned: Boolean
});

module.exports = mongoose.model("discussion", discussionSchema);
