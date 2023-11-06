const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
        sender: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Student" 
        },
        content: {
            type: String, 
            trim: true 
        },
        receiver: {
            type: String, 
            trim: true 
        },
        chat: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Chat" 
        },
        readBy: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Student"
            }
        ],
    },{ timestamps: true }
    );

module.exports = mongoose.model("Message", messageSchema);