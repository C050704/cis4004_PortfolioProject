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
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});