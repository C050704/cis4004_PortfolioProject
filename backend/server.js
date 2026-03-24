const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});