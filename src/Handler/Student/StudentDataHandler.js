const StudentModel = require("../../Model/Student");

const getUserData = async (req, res) => {
  const user = await StudentModel.findById(req.user);
  if (!user) {
    return res.status(400).json({ msg: "No Student data exist!" });
  }
  res.json({ ...user._doc, token: req.token });
};

const getAllStudentData = async (req, res) => {
  try {
    const students_data = await StudentModel.find();
    if (!students_data) {
      console.log("Student Data not found");
    } else {
      res.json(students_data);
    }
  } catch (e) {
    //console.log(e)
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllStudentsNotify = async (req, res, next) => {
  try {
    const students = await StudentModel.find().select("name rollno fcmtoken");

    if (!students || students.length === 0) {
      return res.status(404).json({ error: "Students not found" });
    }

    res.status(200).json({ data: students });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getUserData,
  getAllStudentData,
  getAllStudentsNotify,
};
