// Packages
const express = require("express");

const {
  getBookData,
  createBookData,
  editBookData,
  getBookDataByID,
  deleteBookDataById,
  getBookDataBySubject,
  getBookDataByBookTitle,
  searchLibraryByName
} = require("../../Handler/library/LibraryHandler");

// INIT
const LibraryRouter = express.Router();

// Error Handling Middleware
LibraryRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

LibraryRouter.get("/library/getAllBookData", async function (req, res) {
  await getBookData(req, res);
});

LibraryRouter.get(
  "/library/filterByBookId/:id",
  async function (req, res, next) {
    await getBookDataByID(req, res);
  }
);

LibraryRouter.get("/library/filterBySubject", async function (req, res, next) {
  await getBookDataBySubject(req, res);
});

LibraryRouter.get("/library/filterByTitle", async function (req, res, next) {
  await getBookDataByBookTitle(req, res);
});

LibraryRouter.post("/library/createBookData", async function (req, res) {
  await createBookData(req, res);
});

LibraryRouter.put("/library/updateByBookId/:id", async function (req, res) {
  await editBookData(req, res);
});

LibraryRouter.delete("/library/deleteByBookId/:id", async function (req, res) {
  await deleteBookDataById(req, res);
});
LibraryRouter.get(
  "/library/search",
  searchLibraryByName,
  async function (req, res) {
    await searchLibraryByName(req, res);
  }
);
module.exports = LibraryRouter;
