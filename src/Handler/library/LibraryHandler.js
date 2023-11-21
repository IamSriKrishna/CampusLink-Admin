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

module.exports = {
  getLibraryData,
};
