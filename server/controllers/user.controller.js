const jwt = require('jsonwebtoken')
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Based on instructor Josh's register controller

module.exports.register = async (request, response) => {
    
    const newUser = new User(request.body);
    try {
        const newUserObject = await newUser.save();
        const userToken = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
        response.cookie("usertoken", userToken, process.env.JWT_SECRET, {
            httpOnly:true,
            expires: new Date(Date.now() + 90000000),
        })
        response.json(newUserObject);
    } catch(error) {
        console.log("Error saving to Mongoose!");
        response.status(400).json(error);
        return;
    }
}

// Based on instructor Josh's Login controller
module.exports.login = async (request, response) => {
    const {body} = request;

    if (!body.email) {
        response.status(400).json({ error: "No email entered!" });
        return;
    }

    let userQuery;
    try {
        userQuery = await User.findOne({ email: body.email });
    } catch (error) {
        response.status(400).json({ error: "Email cannot be found!" });
    }

    console.log("query: ", userQuery);

    if (userQuery === null) {
        response.status(400).json({ err: "Email cannot be found!!" });
        return;
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);

    if (!passwordCheck) {
        response.status(400).json({ error: "Email or Password is incorrect!" });
        return;
    }

    const userToken = jwt.sign({ id: userQuery._id}, process.env.JWT_SECRET);
    console.log("token", userToken);

    response.cookie("usertoken", userToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000000),
    })
    .json({message: "Successful Login"})
}

// Based on instructor Josh's and learn platform's Logout controller, does not work though.
// Cannot clear jwt, so must replace it with a token that expires in 1 milli second
module.exports.logout = (request, response) => {
    response
    .clearCookie( 'usertoken' )
    .status(200)
    .json({message: "You have been logged out!"});
}


// Based on learn Platform get 
module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}


// Based on learn Platform update
module.exports.updateProfile = (request, response) => {
    User.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => {response.status(400).json(err)});
}

module.exports.getLoggedInUser = (request, response) => {
    const decodedJWT = jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);
    User.findOne({_id:decodedJWT.id})
        .then(user => {
            response.json(user)})
        .catch(err => response.json(err))
}