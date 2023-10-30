const StudentModel = require("../../Model/Student");

const getUserData = async (req, res) => {
  const user = await StudentModel.findById(req.user);
  res.json({ ...user._doc, token: req.token });
};

module.exports = {
  getUserData,
};
