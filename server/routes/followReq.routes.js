const FollowReqController = require('../controllers/followReq.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

// Including the middleware in the route for authentication was explained by Josh in lecture, I applied his method to own routes

module.exports = (app) => {
    app.post('/api/notification/followreq', jwtMiddleware.authenticateJwt, FollowReqController.createFollowReq);
    // app.get('/api/notification/followreq/:id', jwtMiddleware.authenticateJwt, CommentController.getAllComments);
    app.get('/api/notification/followreq', jwtMiddleware.authenticateJwt, FollowReqController.getFollowReq);
    // app.delete('/api/notification/followreq/:id', jwtMiddleware.authenticateJwt, CommentController.deleteComment);
}
