const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const experienceRecords = await Experience.find({ user: req.user.id });
    res.json(experienceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newExperience = await Experience.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await experience.deleteOne();
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;