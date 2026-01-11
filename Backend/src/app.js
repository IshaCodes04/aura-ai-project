const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport =  require("./config/passport");

/* Require Routes */
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express(); // create server

/* Using middlewares*/
app.use(express.json()); 
app.use(cookieParser()); 

app.use(passport.initialize());


app.use(
  cors({
    origin: "http://localhost:5173", // ✅ frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


/* Using Routes */
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);


module.exports = app;