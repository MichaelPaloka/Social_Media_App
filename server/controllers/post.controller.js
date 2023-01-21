const Post = require('../models/post.model');
const jwt = require('jsonwebtoken')


// Based on instructor Josh's contorller for creating posts

module.exports.createPost = async (request, response) => {
    const {body} = request;
    let newPost = new Post(body);

    try {
        newPost = await newPost.save();
        response.json((newPost));
    } catch (error) {
        console.log("error submitting post", error)
        response.status(400).json(error);
        return;
    }
}

// Based on learn Platform getAll

module.exports.getAllPosts = (request, response) => {
    Post.find().populate({
        path: "postedBy",
        model: "User",
    })
        .exec()
        .then(allPosts => {
            console.log(allPosts);
            response.json(allPosts);
        }) 
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

// Based on learn Platform get 

module.exports.getSinglePost = (request, response) => {
    Post.findOne({_id:request.params.id}).populate([{
        path: "postedBy",
        model: "User",
    },  {
        path: "comments",
        model: "Comment",
    }])
        .then(post => response.json(post))
        .catch(err => response.json(err))
}

// Based on learn Platform find one and update

module.exports.updatePost = (request, response) => {
        GamePost.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedPost => response.json(updatedPost))
        .catch(err => {response.status(400).json(err)});
}

// Based on learn Platform delete 

module.exports.deletePost = (request, response) => {
    Post.deleteOne({ _id: request.params.id })
    .then(confirmDelete => {
        response.json(confirmDelete)})
        // console.log(postToBeDeleted)
    .catch(err => response.json(err))

}