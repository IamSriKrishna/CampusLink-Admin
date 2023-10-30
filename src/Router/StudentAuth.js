// Packages
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// Router
const StudentModel = require("../Model/Student.js");
const auth = require("../../middleware/StudentWare");

// INIT
const StudentRouter = express.Router();
const invalidatedTokens = [];
// Error Handling Middleware
StudentRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

// Post
StudentRouter.post("/kcg/student/signup", async (req, res, next) => {
  try {
    const { name, rollno, password, dp, department, year } = req.body;

    const existingStudent = await StudentModel.findOne({ rollno });

    if (existingStudent) {
      return res
        .status(500)
        .json({ msg: "Student With Same Roll Number Already Exist!" });
    }

    if (!name || !rollno || !password || !dp || !department || !year) {
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
    });
    student = await student.save();
    res.status(200).json({ msg: "Student Account Created" });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

//SignIn
StudentRouter.post("/kcg/student/signin", async (req, res, next) => {
  try {
    const { rollno, password } = req.body;

    const student = await StudentModel.findOne({ rollno });
    if (!student) {
      return res
        .status(400)
        .json({ msg: "student with this email does not exist!" });
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
  } catch (e) {
    next(error);
  }
});
// Signout
StudentRouter.post("/kcg/student/signout", (req, res) => {
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
});
// Check if token is valid
StudentRouter.post("/tokenIsValid", async (req, res) => {
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
});

// get user data
StudentRouter.get("/", auth, async (req, res) => {
  const user = await StudentModel.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//Update Credit
StudentRouter.put("/students/:id/update-credit", async (req, res) => {
  const studentId = req.params.id;
  const { amountToDeduct } = req.body;

  try {
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.credit -= amountToDeduct;
    await student.save();

    res.json({
      message: "Credit updated successfully",
      updatedStudent: student,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Reset Credit
StudentRouter.put("/students/:id/update-credit-zero", async (req, res) => {
  const studentId = req.params.id;
  const { zero } = req.body;

  try {
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    student.credit = zero;

    await student.save();

    res.json({
      message: "Credit updated successfully",
      updatedStudent: student,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Password Without old password
StudentRouter.put("/kcg/student/change-password", auth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const student = await StudentModel.findById(req.user);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 8);
    student.password = hashedNewPassword;

    // Save the updated password
    await student.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Password Using Old Password
StudentRouter.put("/kcg/student/update-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const student = await StudentModel.findById(req.user);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const isMatch = await bcryptjs.compare(currentPassword, student.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 8);
    student.password = hashedNewPassword;

    // Save the updated password
    await student.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = StudentRouter;
