const express = require("express");
const router = express.Router();
const Project = require("../models/Project");


// GET all projects
router.get("/", async (req, res) => {
    const projects = await Project.find().populate("skills");
    res.json(projects);
});

// CREATE Project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE 
router.delete("/:id", async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
});

// UPDATE 
router.put("/:id", async (req, res) => {
    const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});


module.exports = router;
