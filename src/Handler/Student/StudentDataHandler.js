const StudentModel = require("../../Model/Student");

const getUserData = async (req, res) => {
  const user = await StudentModel.findById(req.user.id);
  const { password, __v, createdAt, ...userdata } = user._doc;
  res.status(200).json(userdata)
};

module.exports = {
  getUserData,
};
