const StudentModel = require("../../Model/Student");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const invalidatedTokens = [];

const studentSignIn = async (req, res, next) => {
  try {
    const { rollno, password } = req.body;

    const student = await StudentModel.findOne({ rollno });
    if (!student) {
      return res
        .status(400)
        .json({ msg: "student with this register no does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, student.password);
    if (isMatch !== true) {
      console.log(`${isMatch}\n${student.password}`);
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: student._id }, "passwordKey", {
      algorithm: "HS256",
    });
    res.json({ token, ...student._doc });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

const studentSignUp = async (req, res, next) => {
  try {
    const { name, rollno, password, dp, department, year,fcmtoken } = req.body;

    const existingStudent = await StudentModel.findOne({ rollno });

    if (existingStudent) {
      return res
        .status(500)
        .json({ msg: "Student With Same Roll Number Already Exist!" });
    }

    if (!name || !rollno || !password || !dp || !department || !year||!fcmtoken) {
      return res.status(404).json({ msg: "All fields are mandatory" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    let student = new StudentModel({
      name,
      rollno,
      password: hashedPassword,
      dp,
      department,
      year,
      fcmtoken
    });
    student = await student.save();
    res.status(200).json({ msg: "Student Account Created" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

const StudentSignOut = (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    // Add the token to the blacklist
    invalidatedTokens.push(token);

    res.json({ msg: "You have been successfully signed out." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

TokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    // Check if the token is in the blacklist
    if (invalidatedTokens.includes(token)) {
      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await StudentModel.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { studentSignIn, studentSignUp, StudentSignOut, TokenValid };
