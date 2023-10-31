//Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("/CampusLink-Admin/campuslink-d1f2d-firebase-adminsdk-luzev-16a767c974.json");
//package
const student = require("./src/Router/Student/StudentAuthRouter");
const studentRouter = require("./src/Router/StudentAuth");
const studentData = require("./src/Router/Student/StudentDataRouter");
const PostDataRouter = require("./src/Router/Post/PostDataRouter");
const form = require("./src/Router/FormAuth");
const hello = require("./src/Router/HelloRouter");
const faculty = require("./src/Router/Faculty/FacultyAuthRouter");
const facultyData = require("./src/Router/Faculty/FacultyDataRouter");
// middlewares

const app = express();

// Router
app.use(express.json());
app.use(student);
app.use(studentData);
app.use(form);
app.use(hello);
app.use(faculty);
app.use(facultyData);
app.use(studentRouter);
app.use(PostDataRouter);

//connecting to the database
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Successfully Connected to the database :)");
  })
  .catch((error) => {
    console.log(`Something Went Wrong:(\n${error}`);
  });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://campuslink-d1f2d-default-rtdb.asia-southeast1.firebasedatabase.app",
  });

  app.post('/send-notification', (req, res) => {
    const {registrationToken,body} = req.body;
    const message = {
      notification: {
        title: 'CAMPUSLINK',
        body: body,
      },
      token: registrationToken,
    };
  
    admin.messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
        res.send('Notification sent successfully');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending notification');
      });
  });
//Connecting to the port
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Successfully Connected to the Port: ${process.env.PORT}`);
});
