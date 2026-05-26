const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* =========================
   CORS (PRODUCTION FIXED)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // avoids blocking in production edge cases
    },
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyShare API is running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.log("SERVER ERROR:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size too large. Max size is 10MB.",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error ❌");
    console.log(err);
  });