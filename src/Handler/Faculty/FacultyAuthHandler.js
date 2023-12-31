const FacultyModel = require("../../Model/Faculty");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const invalidatedTokens = [];

const facultySignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const faculty = await FacultyModel.findOne({ email });
    if (!faculty) {
      return res
        .status(400)
        .json({ msg: "faculty with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, faculty.password);
    if (isMatch !== true) {
      console.log(`${isMatch}\n${faculty.password}`);
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: faculty._id }, "passwordKey", {
      algorithm: "HS256",
    });
    res.json({ token, ...faculty._doc });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

const facultySignUp = async (req, res, next) => {
  try {
    // return res.json({ msg: "Hello " });
    const { name, password, dp, department, classTeacher, role, email, fcmtoken} =
      req.body;

    const existingFaculty = await FacultyModel.findOne({ email });

    if (existingFaculty) {
      return res
        .status(500)
        .json({ msg: "Faculty With Same Email Already Exist!" });
    }

    if (!name || !password || !dp || !department || !classTeacher || !role|| !fcmtoken) {
      return res.status(404).json({ msg: "All fields are mandatory" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    let faculty = new FacultyModel({
      name,
      password: hashedPassword,
      dp,
      department,
      classTeacher,
      role,
      email,
      fcmtoken
    });
    faculty = await faculty.save();
    res.status(200).json({ msg: "Faculty Account Created" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

const FacultySignOut = (req, res) => {
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

const getAllFacultyData = async(req,res)=>{
  try{
    const form = await FacultyModel.find({});
    if (!form) {
      console.log("Form not found");
    } else {
      console.log(form);
      res.json(form);
    }
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

TokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json({ msg: "Token is not provoded" });

    // // Check if the token is in the blacklist
    // if (invalidatedTokens.includes(token)) {
    //   return res.json(false);
    // }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await FacultyModel.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update FCMTOKEN
const UpdateFcmToken = async (req, res) => {
  const facultyId = req.params.id;
  const { fcmtoken } = req.body;

  try {
    const faculty = await FacultyModel.findById(facultyId);

    if (!faculty) {
      return res.status(404).json({ error: "faculty not found" });
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

module.exports = { facultySignIn, facultySignUp, FacultySignOut, TokenValid ,getAllFacultyData,UpdateFcmToken};
