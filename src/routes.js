const express = require('express');
const routes = express.Router();

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const {authenticate} = require("./controllers/LoginController");

routes.post('/login', LoginController.login);
routes.post('/refreshToken', LoginController.refreshToken);
routes.post('/users', UserController.createUser);
routes.get('/users', authenticate, UserController.listUsers);
routes.get('/users/:id', UserController.listUserById);
routes.put('/users/:id', UserController.updateUser);
routes.put('/users/reset-password/:id', UserController.resetPassword);
routes.delete('/users/:id', UserController.deleteUser);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;