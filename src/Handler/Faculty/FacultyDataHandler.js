const FacultyModel = require("../../Model/Faculty");

const getFacultyData = async (req, res) => {
  try {
    const faculty = await FacultyModel.findById(req.faculty);
    console.log(faculty);
    if (!faculty) {
      return res.status(400).json({ msg: "No Faculty data exist!" });
    }
    res.json({ ...faculty._doc, token: req.token });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getFacultyData,
};
