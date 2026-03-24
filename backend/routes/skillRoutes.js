const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const Project = require("../models/Project");


// GET all skills
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// CREATE skill
router.post("/", async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.json(skill);
});


// DELETE skill
router.delete("/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
});

// UPDATE skill
router.put("/:id", async (req, res) => {
  const updated = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;