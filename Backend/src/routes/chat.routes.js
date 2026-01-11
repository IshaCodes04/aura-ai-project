const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const chatController = require("../controllers/chat.controller");

const router = express.Router();

/* Chat Api with middleware protected as well as chatController*/
// Create chat
router.post('/', authMiddleware.authUser , chatController.createChat);

// Sidebar chats
router.get("/", authMiddleware.authUser , chatController.getChats);

// Open chat
router.get("/:id", authMiddleware.authUser ,chatController.getChatById);

// Delete chat
router.delete("/:id", authMiddleware.authUser , chatController.deleteChat);



module.exports = router;