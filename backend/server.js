const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/portfolio",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
const certificationRoutes = require("./routes/certificationRoutes");
app.use("/api/certifications", certificationRoutes);

// Test route
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const portfolioRoutes = require("./routes/portfolioRoutes");
const educationRoutes = require("./routes/educationRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "correct backend" });
});