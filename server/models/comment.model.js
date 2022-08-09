const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: [
            true,
            "Comment text is needed!"
        ]
    },
    commentAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "The comment author is required!"
        ],
    }
})