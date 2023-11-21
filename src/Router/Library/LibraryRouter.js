// Packages
const express = require("express");

// INIT
const LibraryRouter = express.Router();

// Error Handling Middleware
LibraryRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

LibraryRouter.get("/library", async function (req, res) {
  await getLibraryData(req, res);
});

module.exports = LibraryRouter;
