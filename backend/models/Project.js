const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    githubLink: {
      type: String,
      default: ""
    },
    linkedinLink: {
      type: String,
      default: ""
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);