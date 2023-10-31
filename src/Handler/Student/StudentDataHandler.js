const StudentModel = require("../../Model/Student");

const getUserData = async (req, res) => {
  const user = await StudentModel.findById(req.user);
  if (!user) {
    return res.status(400).json({ msg: "No Student data exist!" });
  }
  res.json({ ...user._doc, token: req.token });
};

module.exports = {
  getUserData,
};
