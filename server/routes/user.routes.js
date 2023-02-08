const UserController = require('../controllers/user.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

// Including the middleware in the route for authentication was explained by Josh in lecture, I applied his method to own routes


module.exports = (app) => {
    app.post('/api/user', UserController.register);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/user/:id', jwtMiddleware.authenticateJwt, UserController.getLoggedInUser);
    app.put('/api/user/:id', jwtMiddleware.authenticateJwt, UserController.updateProfile);
    app.get('/api/auser/:id', jwtMiddleware.authenticateJwt, UserController.getUser);
    app.get('/api/users/', jwtMiddleware.authenticateJwt, UserController.getAllUsers);

}
