const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const portfolioRoutes = require("./routes/portfolioRoutes");
const educationRoutes = require("./routes/educationRoutes");
const experienceRoutes = require("./routes/experienceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});