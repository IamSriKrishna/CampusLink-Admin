const FacultyModel = require("../../Model/Faculty");

const getFacultyData = async (req, res) => {
  const user = await FacultyModel.findById(req.user);
  if (!user) {
    return res.status(400).json({ msg: "No Faculty data exist!" });
  }
  res.json({ ...user._doc, token: req.token });
};

module.exports = {
  getFacultyData,
};
