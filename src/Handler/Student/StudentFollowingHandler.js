const Student = require("../../Model/Student");

const addFollowing = async (studentId, followingId) => {
    try {
        const student = await Student.findById(studentId);
        const following = await Student.findById(followingId);

        if (student && following && !student.following.includes(followingId)) {
            student.following.push(followingId);
            await student.save();
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const removeFromFollowing = async (studentId, followingId) => {
    try {
        const student = await Student.findById(studentId);

        if (student) {
            student.following.pull(followingId); // Assuming 'following' is an array of IDs
            await student.save();
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getFollowingCount = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (student) {
            const followingCount = student.following.length;
            return followingCount;
        }
        return 0; // If student not found or is not following anyone
    } catch (error) {
        console.error(error);
        return 0; // Error occurred
    }
};

const getFollowing = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (student) {
            const following = await Student.find({ _id: { $in: student.following } });
            return following;
        }
        return []; // If student not found or is not following anyone
    } catch (error) {
        console.error(error);
        return []; // Error occurred
    }
};

module.exports = {
    getFollowing,
    getFollowingCount,
    removeFromFollowing,
    addFollowing
};