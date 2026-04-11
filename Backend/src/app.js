const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("./config/passport");
const path = require("path");

/* Require Routes */
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express(); // create server
app.set("trust proxy", 1); // ✅ Required for Render/Proxies to handle HTTPS correctly

/* Using middlewares*/
app.use(express.json());
app.use(cookieParser());

// Using passport
app.use(passport.initialize());

// Using cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // ✅ Dynamic frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Using path of public files
app.use(express.static(path.join(__dirname, '../public')));


/* Using Routes */
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Catch-all route to serve the frontend for any other URL (SPA routing)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;