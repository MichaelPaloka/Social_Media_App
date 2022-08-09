const mongoose = require('mongoose');

// Based on learn Platform model for users, and who to bcrypt passwords, and validate emails. 


const PostSchema = new mongoose.Schema({
    textBody: { 
        type: String,
        required: [
            true,
            "A post needs some text along with it!"
        ]
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "Posted by is required!"
        ],
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);