const LibraryModel = require("../../Model/library");

const getBookData = async (req, res) => {
  try {
    const library_data = await LibraryModel.find();
    if (!library_data) {
      console.log("Data not found");
    } else {
      //console.log(form);
      res.json(library_data);
    }
  } catch (e) {
    //console.log(e)
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getBookDataByID = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const book = await LibraryModel.findById(bookId);
    console.log(book);
    if (!book) {
      console.log("Book Data not found");
    } else {
      res.json(book);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createBookData = async (req, res) => {
  try {
    const {
      access_no,
      book_title,
      authors,
      publisher,
      source_of_supply,
      no_of_copies,
      subject,
      borrowers,
      photo,
      section_image,
    } = req.body;
    if (
      !access_no ||
      !book_title ||
      !authors ||
      !publisher ||
      !source_of_supply ||
      !no_of_copies ||
      !subject ||
      !section_image
    ) {
      console.log("All fields are mandatory");
      return res.status(400).json({ msg: "All fields are mandatory" });
    }

    let library = new LibraryModel({
      access_no,
      book_title,
      authors,
      publisher,
      source_of_supply,
      no_of_copies,
      subject,
      borrowers,
      photo,
      section_image,
    });
    library = await library.save();
    console.log("All fields are mandatory");
    res.status(200).json({ msg: "Library Data Created" });
  } catch (e) {
    console.log("error:" + e);
    console.error(e);
    res.status(500).json({ error: "Something went wrong:" + e });
  }
};

const editBookData = async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;

  try {
    // Find the post by ID and update it
    const updatedData = await LibraryModel.findByIdAndUpdate(
      bookId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedData) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json({ data: updatedData, msg: "Book data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteBookDataById = async (req, res) => {
  const bookId = req.params.id; // Get the book ID from the URL

  try {
    // Find the book by ID and remove it
    const deletedBook = await LibraryModel.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json({ data: deletedBook, msg: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  getBookData,
  createBookData,
  editBookData,
  getBookDataByID,
  deleteBookDataById,
};
