const FollowReq = require('../models/followReq.model');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')


// Based on instructor Josh's contorller for creating posts

module.exports.createFollowReq = async (request, response) => {
    const decodedJWT = jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);
    const {body} = request;
    let newFollowReq = new FollowReq(body);
    newFollowReq.sentBy = decodedJWT.id
    console.log("this is the followreq " + newFollowReq.sentTo)
    try {
        newFollowReq = await newFollowReq.save();
        response.json((newFollowReq));
    } catch (error) {
        console.log("error sending follow request", error)
        response.status(400).json(error);
        return;
    }
}

// Based on learn Platform getAll

module.exports.getFollowReq = (request, response) => {
    const decodedJWT = jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);
    FollowReq.find({sentTo : decodedJWT.id}).populate({
        path: "sentBy",
        model: "User",
    })
        .exec()
        .then(allFollowReq => {
            console.log(allFollowReq);
            response.json(allFollowReq);
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