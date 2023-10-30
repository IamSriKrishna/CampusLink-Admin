// Packages
const express = require("express");

// INIT
const HelloRouter = express.Router();

// Error Handling Middleware
HelloRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

HelloRouter.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

module.exports = HelloRouter;
