const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Exercise", exerciseSchema);