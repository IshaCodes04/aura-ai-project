require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/db");
const initSocketServer = require("./src/sockets/socket.server");
const httpServer = require("http").createServer(app);

connectDb();

initSocketServer(httpServer);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Express + Socket.IO both running on port ${PORT}`);
});