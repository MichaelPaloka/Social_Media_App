const CommentController = require('../controllers/comment.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

// Including the middleware in the route for authentication was explained by Josh in lecture, I applied his method to own routes

module.exports = (app) => {
    app.post('/api/post', jwtMiddleware.authenticateJwt, CommentController.createComment);
    app.get('/api/post', jwtMiddleware.authenticateJwt, CommentController.getAllComments);
    app.put('/api/post/:id', jwtMiddleware.authenticateJwt, CommentController.updateComment);
    app.delete('/api/post/:id', jwtMiddleware.authenticateJwt, CommentController.deleteComment);
}
