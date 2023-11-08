const Chat = require("../../Model/chat");
const User = require("../../Model/Student");

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with the request");
        return res.status(400).json("UserId param not sent with the request");
    }

    if (!req.user || !req.user.id) {
        console.log("User is not authenticated or user ID is missing");
        return res.status(401).json("User is not authenticated");
    }

    // Check if an existing chat exists with the user making the request and the specified userId
    var isExistingChat = await Chat.find({
        $and: [
            {
                chatName: req.user.id, // Ensure chatName is correctly set
                isGroupChat: false,
                users: { $elemMatch: { $eq: req.user.id } },
            },
            {
                users: { $elemMatch: { $eq: userId } },
            },
        ],
    })
        .populate("users", "-password");

    isExistingChat = await User.populate(isExistingChat, {
        path: "latestMessage.sender",
        select: "name dp rollno fcmtoken",
    });

    if (isExistingChat.length > 0) {
        // Chat already exists, send the chat information
        res.status(200).json(isExistingChat[0]);
    } else {
        // No existing chat found, create a new one
        var chatData = {
            chatName: req.user.id,
            isGroupChat: false,
            users: [req.user.id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );

            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).json("Error Creating Chat");
        }
    }
};

const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 });

        // Check if there are any existing chats with the user making the request and the provided userId
        for (const chat of chats) {
            if (chat.users.includes(req.user.id) && chat.users.includes(userId)) {
                // Chat with both users already exists, skip this chat
                continue;
            }

            // Chat with both users does not exist, populate additional details
            await User.populate(chat, {
                path: "latestMessage.sender",
                select: "name dp rollno fcmtoken",
            });
        }

        console.log(chats)
        res.status(200).send(chats);
    } catch (error) {
        console.log(error)
        res.status(500).json("Error Fetching Chat");
    }
};

module.exports = {
    accessChat,
    getChats
}