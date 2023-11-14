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
module.exports = {
    addFollowers,
    addFollowing,
    removeFromFollowing,
    removeFromfollowers,
    getFollowersCount,
    getFollowingCount
};