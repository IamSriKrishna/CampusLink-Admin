const Chat = require("../../Model/chat");
const User = require("../../Model/Student");

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with the request");
        return res.status(400).json("UserId param not sent with the request");
    }

    // Check if a chat with the given userId exists
    var isChat = await Chat.find({
        chatName: req.user.id||userId, // Ensure chatName is correctly set
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id||userId } } },
            { users: { $elemMatch: { $eq: userId||req.user.id } } },
        ],
    })
        .populate("users", "-password");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name dp rollno fcmtoken",
    });
    
    if (!userId) {
        console.log("UserId param not sent with the request");
        return res.status(400).json("UserId param not sent with the request");
    }

    if (!req.user || !req.user.id) {
        console.log("User is not authenticated or user ID is missing");
        return res.status(401).json("User is not authenticated");
    }
    if (isChat.length > 0) {
        // Chat exists, send the chat information
        res.status(200).json(isChat[0]);
        console.log(`Already exist${isChat[0]}`);
    } else {
    
        var chatData = {
            chatName: req.user.id, 
            isGroupChat: false,
            users: [req.user.id, userId],
        };
        console.log(chatData); // Check if chatName is set correctly

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            console.log(FullChat)
            res.status(200).json(FullChat);
        } catch (error) {
            console.log(error)
            res.status(400).json("Error Creating Chat");
        }
    }
};

const getChats = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name dp rollno fcmtoken",
                });
                
                console.log(results)
                res.status(200).send(results);
            });
    } catch (error) {
        console.log(error)
        res.status(500).json("Error Fetching Chat");

    }

}
module.exports = {
    accessChat,
    getChats
}