const jwt = require('jsonwebtoken');

// Bassed on Josh's example for middleware

const authenticateJwt = async (req, res, next) => {
    let decodedJwt;
    try {
        decodedJwt = await jwt.verify(
            req.cookies.usertoken,
            process.env.JWT_SECRET
        );
        console.log("Success", decodedJwt);
        next();
    } catch (error) {
        console.log("Token Error");
        console.log(decodedJwt)
        res.status(400).json({ message: "You must be logged in to access that!" });
    }
}

module.exports = {authenticateJwt}