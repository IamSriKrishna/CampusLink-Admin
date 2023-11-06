// Packages
const express = require("express");

// internal Package
const authForMessage = require("../../../middleware/AuthForMessage");
const { accessChat, getChats } = require("../../Handler/chat/ChatAuthHandler");
// INIT
const ChatRouter = express.Router();

// Error Handling Middleware
ChatRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});
// CREATE CHAT
ChatRouter.post("/create-chat/", authForMessage, async function (req, res) {
  await accessChat(req, res);
});

// Get Chats
ChatRouter.get("/get-chat/", authForMessage, async function (req, res) {
  await getChats(req, res);
});

module.exports = ChatRouter;
