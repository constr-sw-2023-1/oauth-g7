const request = require('request');
const express = require('express');
const session = require('express-session');
const routes = express.Router();
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const {verifyTokenExpiration} = require("./controllers/LoginController");

const memoryStore = new session.MemoryStore();
routes.use(session({
    secret: 'seu-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

routes.post('/login', LoginController.login);
routes.post('/refreshToken', verifyTokenExpiration, LoginController.refreshTokens);
routes.post('/users', verifyTokenExpiration, UserController.createUser);
routes.get('/users', verifyTokenExpiration, UserController.listUsers);
routes.get('/users/:id', verifyTokenExpiration, UserController.listUserById);
routes.put('/users/:id', verifyTokenExpiration, UserController.updateUser);
routes.patch('/users/:id', verifyTokenExpiration, UserController.resetPassword);
routes.delete('/users/:id', verifyTokenExpiration, UserController.deleteUser);

module.exports = routes;