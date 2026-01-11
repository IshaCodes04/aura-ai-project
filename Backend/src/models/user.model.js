const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Google login optional hai toh
  },
  username: {
    type: String,
    required: false, // Optional kiya kyunki ab fullName use kar rahe hain
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  password: {
    type: String,
    // Google login mein password nahi chahiye
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);