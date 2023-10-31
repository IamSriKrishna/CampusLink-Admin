// Packages

const express = require("express");
const schedule = require("node-schedule");
const moment = require("moment");
// Router
const FormModel = require("../Model/Form");
const StudentWare = require("../../middleware/Auth.js");

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
      studentid,
      spent,
      fcmtoken,
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
      studentid,
      spent,
      fcmtoken,
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
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
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
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// Get all student form
FormRouter.get("/kcg/student/form", async (req, res, next) => {
  try {
    const form = await FormModel.find({});

    if (!form) {
      console.log("Form not found");
    } else {
      console.log(form);
      res.json(form);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Update Student Form
FormRouter.put("/kcg/student/form/:studentid/update-form", async (req, res) => {
  try {
    const FormId = req.params.studentid;
    const { response } = req.body; // Get the registration token from the request body

    if (!FormId) {
      res.status(400).json({ msg: "Bad Request! Provide Form ID" });
    }
    if (!response) {
      res.status(400).json({ msg: "Bad Request! Required key 'response'" });
    }
    const form = await FormModel.findById(FormId);

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    form.response = response;
    await form.save();

    res.json({
      message: "Response updated successfully",
      updatedForm: form,
    });
  } catch (error) {
    console.error("notification" + error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = FormRouter;
