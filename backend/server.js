const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const testRoutes = require("./routes/testRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const discoverRoutes = require("./routes/discoverRoutes.js");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/discover", discoverRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
