const mongoose = require('mongoose');

const FollowReqSchema = new mongoose.Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "sentBy by is required!"
        ],
    },
    sentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "SentTo by is required!"
        ],
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', FollowReqSchema);