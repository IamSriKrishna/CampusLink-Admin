// Packages
const express = require("express");
const bcryptjs = require("bcryptjs");

// Router
const StudentModel = require("../Model/Student.js");
const auth = require("../../middleware/Auth.js");

// INIT
const StudentRouter = express.Router();

// Error Handling Middleware
StudentRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

// get user data
StudentRouter.get("/", auth, async (req, res) => {
  const user = await StudentModel.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//Update Credit
StudentRouter.put("/students/:id/update-credit", async (req, res) => {
  const studentId = req.params.id;
  const { credit } = req.body;

  try {
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.credit -= credit;
    await student.save();

    res.json({
      message: "Credit updated successfully",
      updatedStudent: student,
    });
  } catch (error) {
    console.log(error);
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
    console.error(error);
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
