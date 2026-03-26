const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/authMiddleware");

// GET — only this user's skills
router.get("/", authMiddleware, async (req, res) => {
  const skills = await Skill.find({ user: req.user.id });
  res.json(skills);
});

// CREATE — attach user
router.post("/", authMiddleware, async (req, res) => {
  const skill = new Skill({ ...req.body, user: req.user.id });
  await skill.save();
  res.json(skill);
});

// DELETE — check ownership first
router.delete("/:id", authMiddleware, async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) return res.status(404).json({ message: "Not found" });
  if (skill.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
});

// UPDATE — check ownership
router.put("/:id", authMiddleware, async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) return res.status(404).json({ message: "Not found" });
  if (skill.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });
  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});



module.exports = router;