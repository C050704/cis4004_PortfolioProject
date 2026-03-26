const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Language", "Framework", "Tool", "Technology", "Certification", "Other Skills"],
    required: true
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  }
});

module.exports = mongoose.model("Skill", skillSchema);