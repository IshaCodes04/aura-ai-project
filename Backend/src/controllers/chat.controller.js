const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model"); // ✅ ADD THIS

/* ===============================
   CREATE CHAT
================================ */
async function createChat(req, res) {
  try {
    const { title } = req.body;
    const user = req.user;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const chat = await chatModel.create({
      user: user._id,
      title,
      lastActivity: Date.now(),
    });

    res.status(201).json({
      message: "Chat created successfully enjoyy!!",
      chat: {
        _id: chat._id,
        title: chat.title,
        lastActivity: chat.lastActivity,
        user: chat.user,
      },
    });
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({ message: "Failed to create chat" });
  }
}

/* ===============================
   GET ALL CHATS (SIDEBAR)
================================ */
async function getChats(req, res) {
  try {
    const user = req.user;

    const chats = await chatModel
      .find({ user: user._id })
      .sort({ lastActivity: -1 }); // ✅ Latest first

    res.status(200).json({
      chats,
    });
  } catch (error) {
    console.error("Get chats error:", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
}

/* ===============================
   GET CHAT BY ID (WITH MESSAGES) ✅ FIXED
================================ */
async function getChatById(req, res) {
  try {
    const user = req.user;
    const chatId = req.params.id;

    const chat = await chatModel.findOne({
      _id: chatId,
      user: user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // ✅ Fetch messages for this chat
    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 });

    res.status(200).json({
      chat: {
        _id: chat._id,
        title: chat.title,
        user: chat.user,
        lastActivity: chat.lastActivity,
        messages: messages, // ✅ Include messages
      },
    });
  } catch (error) {
    console.error("Get chat by id error:", error);
    res.status(500).json({ message: "Failed to fetch chat" });
  }
}

/* ===============================
   DELETE CHAT
================================ */
async function deleteChat(req, res) {
  try {
    const user = req.user;
    const chatId = req.params.id;

    // ✅ Delete chat and its messages
    await Promise.all([
      chatModel.deleteOne({ _id: chatId, user: user._id }),
      messageModel.deleteMany({ chat: chatId }), // ✅ Delete messages too
    ]);

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Delete chat error:", error);
    res.status(500).json({ message: "Failed to delete chat" });
  }
}

module.exports = {
  createChat,
  getChats,
  getChatById,
  deleteChat,
};