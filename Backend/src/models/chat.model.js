const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId, // user id who able to chat
    ref: 'user', // from which collection id belongs
    required: true
  },
  title: {
    type: String,
    required: true
  },
  lastActivity: {
    type: Date,
    default: Date.now // for check last message in chat
  }

}, {
  timestamps: true
})

const chatModel = mongoose.model("chat", chatSchema);



module.exports = chatModel;