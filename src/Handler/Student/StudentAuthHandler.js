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
    const { name, rollno, password, dp, department, year,fcmtoken ,Studentclass} = req.body;

    const existingStudent = await StudentModel.findOne({ rollno });

    if (existingStudent) {
      return res
        .status(500)
        .json({ msg: "Student With Same Roll Number Already Exist!" });
    }

    if (!name || !rollno || !password || !dp || !department || !year|| !fcmtoken|| !Studentclass) {
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
      fcmtoken,
      Studentclass
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
    if (!token) {
      return res.json(false);
    }


    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await StudentModel.findById(verified.id);
    if (!user){
      return res.json(false);
    }
    
    res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update FCMTOKEN
const UpdateFcmToken = async (req, res) => {
  const StudentId = req.params.id;
  const { fcmtoken } = req.body;

  try {
    const faculty = await StudentModel.findById(StudentId);

    if (!faculty) {
      return res.status(404).json({ error: "Student not found" });
    }

    faculty.fcmtoken = fcmtoken;
    await faculty.save();


    res.json({
      message: "FCMToken updated successfully",
      updatedStudent: faculty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllStudentData = async(req,res)=>{
  try{
    const student = await StudentModel.find({});
    if (!student) {
      console.log("Student not found");
    } else {
      console.log(student);
      res.json(student);
    }
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}
const searchStudentByName = async (req, res) => {
  try {
    const { name } = req.query;
   
    if (!name) {
      // If no name is provided, return all student data
      const students = await StudentModel.find({});
      res.json(students);
    } else {
      const regex = new RegExp(name, 'i'); // Case-insensitive regex

      const students = await StudentModel.find({
        name: { $regex: regex } 
      });

      if (students.length === 0) {
        return res.status(404).json({ msg: "No students found with the provided name." });
      }

      res.json(students);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { 
  studentSignIn, 
  studentSignUp, 
  StudentSignOut, 
  TokenValid ,
  UpdateFcmToken,
  getAllStudentData,
  searchStudentByName
};
