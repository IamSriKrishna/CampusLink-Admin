// Packages
const express = require("express");
const schedule = require("node-schedule");
const moment = require("moment");

// Router
const FormModel = require("../Model/Form.js");
const StudentWare = require("../../middleware/StudentWare.js");

// INIT
const FormRouter = express.Router();

// Error Handling Middleware
FormRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

//Store Form data using post method
FormRouter.post("/kcg/student/form-upload", async (req, res, next) => {
  try {
    const {
      name,
      rollno,
      password,
      dp,
      department,
      formtype,
      Studentclass,
      year,
      reason,
      no_of_days,
      from,
      to,
      id,
      spent,
    } = req.body;

    let form = new FormModel({
      name,
      rollno,
      password,
      dp,
      department,
      formtype,
      Studentclass,
      year,
      reason,
      no_of_days,
      from,
      to,
      id,
      spent,
    });
    form = await form.save();

    console.log();
    res.status(200).json({ msg: "Form Uploaded Successfully" });

    const deleteJob = schedule.scheduleJob(
      moment().add(5, "days").toDate(),
      async () => {
        // Delete the form data here
        await FormModel.findByIdAndRemove(form._id); // Assuming you have an _id field in your model
        console.log(
          `Form data with ID ${form._id} has been automatically deleted.`
        );
      }
    );
  } catch (e) {
    next(e);
  }
});

// Get a particular student form by rollno
FormRouter.get(
  "/kcg/student/form/:rollno",
  StudentWare,
  async (req, res, next) => {
    try {
      const rollno = req.params.rollno;

      const form = await FormModel.find({ rollno });

      if (!form) {
        console.log("Form not found");
      } else {
        console.log(form);
        res.json(form);
      }
    } catch (e) {
      next(e);
    }
  }
);

// Get a particular student form by rollno
FormRouter.get("/kcg/student/form", StudentWare, async (req, res, next) => {
  try {
    const form = await FormModel.find({});

    if (!form) {
      console.log("Form not found");
    } else {
      console.log(form);
      res.json(form);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = FormRouter;
