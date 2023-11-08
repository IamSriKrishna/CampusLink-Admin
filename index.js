//Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./campuslink-d1f2d-firebase-adminsdk-luzev-16a767c974.json");
//package
const student = require("./src/Router/Student/StudentAuthRouter");
const studentRouter = require("./src/Router/StudentAuth");
const studentData = require("./src/Router/Student/StudentDataRouter");
const PostDataRouter = require("./src/Router/Post/PostDataRouter");
const form = require("./src/Router/FormAuth");
const hello = require("./src/Router/HelloRouter");
const faculty = require("./src/Router/Faculty/FacultyAuthRouter");
const facultyData = require("./src/Router/Faculty/FacultyDataRouter");
const messenger = require("./src/Router/Messenger/MessengerAuthRouter");
const chat = require("./src/Router/Chat/ChatAuthRouter");
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
app.use(messenger);
app.use(chat);

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
  databaseURL:
    "https://campuslink-d1f2d-default-rtdb.asia-southeast1.firebasedatabase.app",
});

app.post("/send-notification", (req, res) => {
  const { registrationToken, body} = req.body;
  const message = {
    notification: {
      title: "CAMPUSLINK",
      body: body,
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.send("Notification sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending notification");
    });
});

app.post("/send-notification-toAll", (req, res) => {
  const { registrationTokens, body } = req.body;

  const sendNotificationToToken = async (token) => {
    const message = {
      notification: {
        title: "CAMPUSLINK",
        body: body,
      },
      token: token,
    };

    try {
      const response = await admin.messaging().send(message);
      //console.log(`Successfully sent message to ${token}`);
      return response;
    } catch (error) {
      //console.error(`Error sending message to ${token}:`, error);
      return null;
    }
  };

  const sendAllNotifications = async () => {
    const responses = await Promise.all(
      registrationTokens.map((token) => sendNotificationToToken(token))
    );

    const successResponses = responses.filter((response) => response !== null);
    const failureCount = registrationTokens.length - successResponses.length;

    //console.log(`Successfully sent ${successResponses.length} messages`);
    //console.log(`Failed to send ${failureCount} messages`);
    res.send(`Successfully sent ${successResponses.length} messages`);
  };

  sendAllNotifications();
});

//Connecting to the port
var server = app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Successfully Connected to the Port: ${process.env.PORT}`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://13.126.172.50:3000"
  }
});

io.on("connection", (socket) => {
  //console.log("connected to sockets");

  socket.on('setup', (userId) => {
    socket.join(userId);
    socket.broadcast.emit('online-users', userId);
    //console.log(userId);
  });

  socket.on('typing', (room) => {
    socket.to(room).emit('typing', room);
  });

  socket.on('stop typing', (room) => {
    socket.to(room).emit('stop typing', room);
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    //console.log('User Joined : ' + room);
  });

  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    var room = chat._id;

    var sender = newMessageReceived.sender;

    if (!sender || sender._id) {
      return;
    }

    var senderId = sender._id;

    const users = chat.users;

    if (!users) {
      return;
    }

    socket.to(room).emit('message received', newMessageReceived);
    socket.to(room).emit('message sent', "New Message");
  });

  socket.on('disconnect', () => {
   // console.log('User disconnected');
  });
});