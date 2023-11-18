const Student = require("../../Model/Student");

const addFollowers = async (studentId, followerId) => {
    try {
        const student = await Student.findById(studentId);
        const follower = await Student.findById(followerId);

        if (student && follower && !student.followers.includes(followerId)) {
            student.followers.push(followerId);
            await student.save();
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const removeFromfollowers = async (studentId, followersId) => {
    try {
        const student = await Student.findById(studentId);

        if (student) {
            student.followers.pull(followersId); // Assuming 'followers' is an array of IDs
            await student.save();
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getFollowersCount = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (student) {
            const followersCount = student.followers.length;
            return followersCount;
        }
        return 0; // If student not found or has no followers
    } catch (error) {
        console.error(error);
        return 0; // Error occurred
    }
};

const getFollowers = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (student) {
            const followers = await Student.find({ _id: { $in: student.followers } });
            return followers;
        }
        return []; // If student not found or has no followers
    } catch (error) {
        console.error(error);
        return []; // Error occurred
    }
};

module.exports = {
    getFollowers,
    getFollowersCount,
    removeFromfollowers,
    addFollowers
};