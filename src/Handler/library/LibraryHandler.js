const LibraryModel = require("../../Model/library");

const getLibraryData = async (req, res) => {
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
const createLibraryData = async (req, res) => {
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
    } = req.body;
    if (
      !access_no ||
      !book_title ||
      !authors ||
      !publisher ||
      !source_of_supply ||
      !no_of_copies ||
      !subject ||
      !borrowers
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
    });
    library = await library.save();
    console.log("All fields are mandatory");
    res.status(200).json({ msg: "Post Created" });
  } catch (e) {
    console.log("error:" + e);
    console.error(e);
    res.status(500).json({ error: "Something went wrong:" + e });
  }
};

module.exports = {
  getLibraryData,
  createLibraryData,
};
