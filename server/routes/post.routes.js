const PostController = require('../controllers/post.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

// Including the middleware in the route for authentication was explained by Josh in lecture, I applied his method to own routes

module.exports = (app) => {
    app.post('/api/post', jwtMiddleware.authenticateJwt, PostController.createPost);
    app.get('/api/post', jwtMiddleware.authenticateJwt, PostController.getAllPosts);
    app.get('/api/post/:id', jwtMiddleware.authenticateJwt, PostController.getSinglePost);
    app.put('/api/post/:id', jwtMiddleware.authenticateJwt, PostController.updatePost);
    app.delete('/api/post/:id', jwtMiddleware.authenticateJwt, PostController.deletePost);
}
