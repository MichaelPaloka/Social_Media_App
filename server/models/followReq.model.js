const mongoose = require('mongoose');

const FollowReqSchema = new mongoose.Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "Posted by is required!"
        ],
    },
    sentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "Posted by is required!"
        ],
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', FollowReqSchema);