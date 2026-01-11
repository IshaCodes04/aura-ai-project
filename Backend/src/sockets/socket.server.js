const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    }
  });

  // ✅ Socket Authentication Middleware - Support both methods
  io.use(async (socket, next) => {
    try {
      let token = null;

      // Method 1: Check socket.handshake.auth (Frontend bhejta hai)
      if (socket.handshake.auth && socket.handshake.auth.token) {
        token = socket.handshake.auth.token;
        console.log("✅ Token from socket.handshake.auth");
      }

      // Method 2: Check cookies (Fallback)
      if (!token) {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (cookies.token) {
          token = cookies.token;
          console.log("✅ Token from cookies");
        }
      }

      if (!token) {
        console.error("❌ No token found in socket connection");
        return next(new Error("Authentication Error: No token provided"));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);

      if (!user) {
        console.error("❌ User not found:", decoded.id);
        return next(new Error("Authentication Error: User not found"));
      }

      socket.user = user;
      console.log(`✅ User authenticated via socket: ${user.email}`);
      next();

    } catch (err) {
      console.error("❌ Socket auth error:", err.message);
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ socket connected:", socket.id);
  });

  io.on("connection", (socket) => {

    console.log("✅ User connected:", socket.user.email);

    // ai-message

    socket.on('ai-message', async (messagePayload) => {

      try {
        // ✅ Convert chat string to ObjectId
        const chatId = new mongoose.Types.ObjectId(messagePayload.chat);

        //  Here we use Promise becos both things start exact at one time
        const [Inputmessage, vectors] = await Promise.all([
          // Save chatHistory of user in DB 
          messageModel.create({
            chat: chatId, // ✅ Use converted ObjectId
            user: socket.user._id,
            content: messagePayload.content,
            role: "user"
          }),
          // convert user inputs into vector and generate     
          aiService.generateVector(messagePayload.content)
        ])

        // now we store user input vector's in pinecone db
        await createMemory({
          vectors,
          messageId: Inputmessage._id,
          metadata: {
            chat: messagePayload.chat, // ✅ Keep original string for metadata
            user: socket.user._id.toString(),
            text: messagePayload.content
          }
        })

        // Here we use Promise becos both work do at exact one time
        const [memory, chatHistory] = await Promise.all([
          // find similar messages in memory with help of queryVector's 
          queryMemory({
            queryVector: vectors,
            limit: 3,
            metadata: {
              user: socket.user._id.toString()
            }
          }),

          // Retrieved chatHistory from mongo db (STM)  
          messageModel.find({
            chat: chatId // ✅ Use converted ObjectId
          })
        ])

        console.log("🧠 Long term memory:", memory);

        // Short term memory 
        const STM = chatHistory.map(item => {
          return {
            role: item.role,
            parts: [{ text: item.content }]
          }
        });

        // Long term memory
        const LTM = memory.length > 0 ? [
          {
            role: "user",
            parts: [{
              text: `
              
              these are some previous messages from chat, use them to generate response
              
              ${memory.map(item => item.metadata.text).join("\n")}

              `
            }]
          }
        ] : [];

        console.log("📊 LTM:", LTM.length > 0 ? LTM[0] : "No long-term memory");
        console.log("📊 STM messages count:", STM.length);

        // pass both ltm or stm memories
        const response = await aiService.generateResponse([...LTM, ...STM])

        // ai-response       
        socket.emit('ai-response', {
          content: response,
          chat: messagePayload.chat
        })

        console.log("✅ AI Response sent:", response.substring(0, 50) + "...");

        // Save AI response to DB and convert to vector
        const [responseMessage, responseVector] = await Promise.all([
          messageModel.create({
            chat: chatId, // ✅ Use converted ObjectId
            user: socket.user._id,
            content: response,
            role: "model"
          }),
          aiService.generateVector(response)
        ])

        // now save model input vector's in pinecone db
        await createMemory({
          vectors: responseVector,
          messageId: responseMessage._id,
          metadata: {
            chat: messagePayload.chat,
            user: socket.user._id.toString(),
            text: response
          }
        })

      } catch (error) {
        console.error("❌ Error in ai-message handler:", error);
        socket.emit('ai-error', {
          message: "Failed to process message",
          error: error.message
        });
      }

    })

    socket.on('disconnect', () => {
      console.log("❌ User disconnected:", socket.user.email);
    });

  })

}


module.exports = initSocketServer;