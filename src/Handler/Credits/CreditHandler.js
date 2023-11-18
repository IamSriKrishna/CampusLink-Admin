
updateCredit = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const { credit } = req.body;
        const student = await StudentModel.findById(studentId);

        if (!student) {
          return res.status(404).json({ error: "Student not found" });
        }
      
        student.credit -= credit;
        await student.save();
      
        res.json({
          message: "Credit updated successfully",
          updatedStudent: student,
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
 
}

// resetCredit = async (req, res) => {
//     const studentId = req.params.id;
//     const { zero } = req.body;
  
//     try {
//       const student = await StudentModel.findById(studentId);
  
//       if (!student) {
//         return res.status(404).json({ error: "Student not found" });
//       }
//       student.credit = zero;
  
//       await student.save();
  
//       res.json({
//         message: "Credit updated successfully",
//         updatedStudent: student,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
// }

module.exports = {updateCredit, resetCredit}