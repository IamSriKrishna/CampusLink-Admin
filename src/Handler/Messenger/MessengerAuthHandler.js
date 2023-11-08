const Chat = require("../../Model/chat");
const Message = require("../../Model/message");
const User = require("../../Model/Student");
const getAllMessage = async (req, res) => {
    try {
        const pageSize = 100; // Number of messages per page
        const page = req.query.page || 1; // Current page number

        // Calculate the number of messages to skip
        const skipMessages = (page - 1) * pageSize;

        // Find messages with pagination
        var messages = await Message.find({ chat: req.params.id })
            .populate("sender", "name dp rollno fcmtoken")
            .populate("chat")
            .sort({ createdAt: -1 }) // Sort messages by descending createdAt
            .skip(skipMessages) // Skip the messages based on pagination
            .limit(pageSize); // Limit the number of messages per page

        messages = await User.populate(messages, {
            path: "chat.users",
            select: "name dp rollno fcmtoken",
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json('Could not get chats');
    }
}

const sendMessage = async (req, res) => {
    const { content, chatId, receiver } = req.body;

        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.status(400);
        }

        var newMessage = {
            sender: req.user.id,
            content: content,
            receiver: receiver,
            chat: chatId,
        };

        try {
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "name dp rollno fcmtoken");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "name dp rollno fcmtoken",
            });

            await Chat.findById(req.body.chatId);

            res.json(message);
        } catch (error) {
            res.status(400).json(error);
        }
}

module.exports = {getAllMessage,sendMessage}