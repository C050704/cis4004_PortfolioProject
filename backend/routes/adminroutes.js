const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

const authMiddleware = require("../middleware/authMiddleware");

// Admin check middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// GET all users
router.get("/users", authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all portfolios
router.get("/portfolios", authMiddleware, adminOnly, async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate("user", "username email");
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE content (example: project)
router.delete("/content/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const Project = require("../models/Project");

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Content not found" });
    }

    await project.deleteOne();

    res.json({ message: "Content deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;