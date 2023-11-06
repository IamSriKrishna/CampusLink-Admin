// Packages
const express = require("express");

// internal Package
const auth = require("../../../middleware/Auth");
const {
  getAllMessage,
  sendMessage,
} = require("../../Handler/Messenger/MessengerAuthHandler");
// INIT
const MessengerRouter = express.Router();

// Error Handling Middleware
MessengerRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

MessengerRouter.post("/send-message/", auth, async function (req, res) {
  await sendMessage(req, res);
});

MessengerRouter.get("/get-message/:id", auth, async function (req, res) {
  await getAllMessage(req, res);
});

module.exports = MessengerRouter;
