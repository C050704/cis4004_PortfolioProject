const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");

// GET all certifications
router.get("/", async (req, res) => {
  try {
    const certs = await Certification.find();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET certifications by username (IMPORTANT)
router.get("/user/:username", async (req, res) => {
  try {
    const certs = await Certification.find({
      username: req.params.username,
    });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create certification
router.post("/", async (req, res) => {
  try {
    const cert = new Certification({
      title: req.body.title,
      issuer: req.body.issuer,
      date: req.body.date,
      description: req.body.description,
      username: req.body.username, // 🔥 REQUIRED
    });

    const saved = await cert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;