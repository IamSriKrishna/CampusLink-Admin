// Packages
const express = require("express");

// internal Package
const {verifyToken} = require("../../../middleware/Authentication");
const auth = require("../../../middleware/Auth");
const { accessChat, getChats, deleteChat } = require("../../Handler/chat/ChatAuthHandler");
// INIT
const ChatRouter = express.Router();

// Error Handling Middleware
ChatRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});
// CREATE CHAT
ChatRouter.post("/create-chat/", verifyToken, async function (req, res) {
  await accessChat(req, res);
});

// Get Chats
ChatRouter.get("/get-chat/", verifyToken, async function (req, res) {
  await getChats(req, res);
});

// Delete Chat
ChatRouter.delete("/delete-chat/", verifyToken, async function (req, res) {
  await deleteChat(req, res);
});

module.exports = ChatRouter;
