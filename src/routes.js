const request = require('request');
const express = require('express');
const session = require('express-session');
const routes = express.Router();
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

const memoryStore = new session.MemoryStore();
routes.use(session({
    secret: 'seu-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

routes.post('/login', LoginController.login);
routes.post('/refreshToken', LoginController.refreshTokens);
routes.post('/users', UserController.createUser);
routes.get('/users', UserController.listUsers);
routes.get('/users/:id', UserController.listUserById);
routes.put('/users/:id', UserController.updateUser);
routes.patch('/users/:id', UserController.resetPassword);
routes.delete('/users/:id', UserController.deleteUser);

module.exports = routes;