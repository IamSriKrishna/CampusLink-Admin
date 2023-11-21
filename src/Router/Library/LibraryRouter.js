// Packages
const express = require("express");

const {
  getBookData,
  createBookData,
  editBookData,
  getBookDataByID,
  deleteBookDataById,
} = require("../../Handler/library/LibraryHandler");

// INIT
const LibraryRouter = express.Router();

// Error Handling Middleware
LibraryRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

LibraryRouter.get("/library", async function (req, res) {
  await getBookData(req, res);
});

LibraryRouter.get("/library/:id", async function (req, res, next) {
  await getBookDataByID(req, res);
});

LibraryRouter.post("/library", async function (req, res) {
  await createBookData(req, res);
});

LibraryRouter.put("/library/:id", async function (req, res) {
  await editBookData(req, res);
});

LibraryRouter.delete("/library/:id", async function (req, res) {
  await deleteBookDataById(req, res);
});

module.exports = LibraryRouter;
