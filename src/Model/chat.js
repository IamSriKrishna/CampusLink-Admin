const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
        chatName: {
            type: String, 
            required:true 
        },
        isGroupChat: {
            type: Boolean, 
            default: false 
        },
        users: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Student"
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            select: false,
        },
        groupAdmin: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Student"
        },
    },
    { timestamps: true }
    );

module.exports = mongoose.model("Chat", chatModel);

