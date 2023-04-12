const request = require('request');
const express = require('express');
const routes = express.Router();

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

routes.post('/login', LoginController.login);
routes.post('/users', UserController.createUser);
routes.get('/users', UserController.listUsers);
routes.get('/users/:id', UserController.listUserById);
routes.put('/users/:id', UserController.updateUser);
routes.patch('/users/:id', UserController.resetPassword);
routes.delete('/users/:id', UserController.deleteUser);

module.exports = routes;