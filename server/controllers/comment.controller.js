const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken')


// Based on instructor Josh's contorller for creating posts

module.exports.createComment = async (request, response) => {
    const {body} = request;
    let newComment = new Comment(body);
    const decodedJWT = await jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);
        newComment.commentAuthor = decodedJWT.id;

    try {
        newComment = await newComment.save();
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

// Based on learn Platform get 

// module.exports.getSinglePost = (request, response) => {
//     Post.findOne({_id:request.params.id})
//         .then(post => response.json(post))
//         .catch(err => response.json(err))
// }

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