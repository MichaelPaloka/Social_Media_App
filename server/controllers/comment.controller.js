const Comment = require('../models/comment.model');
const Post = require('../models/post.model')
const jwt = require('jsonwebtoken')


// Based on instructor Josh's contorller for creating posts

module.exports.createComment = async (request, response) => {
    const {body, params} = request;
    let newComment = new Comment(body);
    console.log(newComment.postId)
    console.log(newComment.commentText)
    console.log("New comment with both postid and use id added after authentication", newComment)
    try {
        newComment = await newComment.save();
        postQuery = await Post.findByIdAndUpdate(
            {_id: newComment.postId},
            {$push: {comments: newComment._id}},
            {new: true, useFindAndModify: true}
        )
        response.json((newComment));
    } catch (error) {
        console.log("error adding comment", error)
        response.status(400).json(error);
        return;
    }
}

// Based on learn Platform getAll

module.exports.getAllComments = (request, response) => {
    Comment.find().populate({
        path: "postedBy",
        model: "User",
    })
        .exec()
        .then(allComments => {
            console.log(allComments);
            response.json(allComments);
        }) 
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

// Based on learn Platform find one and update

module.exports.updateComment = (request, response) => {
        Comment.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedComment => response.json(updatedComment))
        .catch(err => {response.status(400).json(err)});
}

// Based on learn Platform delete 

module.exports.deleteComment = (request, response) => {
    Comment.deleteOne({ _id: request.params.id })
    .then(confirmDelete => {
        response.json(confirmDelete)})
    .catch(err => response.json(err))

}