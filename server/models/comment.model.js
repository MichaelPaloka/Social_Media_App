const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [
            true,
            "The post id is required!"
        ],
    },
    commentText: {
        type: String,
        required: [
            true,
            "Comment text is needed!"
        ]
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "The comment author is required!"
        ],
    }
})

module.exports = mongoose.model('Comment', CommentSchema);