const express = require('express');
const UserController = require('./controllers/UserController');
const routes = express.Router();
routes.get('/login', (req, res) => {
    res.send('Route Login');
});

routes.post('/users', (req, res) => {
    res.send('Criar usuário');
});

routes.get('/users', (req, res) => {
    res.send('Recuperar todos os usuários');
});

routes.get('/users/:id', (req, res) => {
    res.send('Recuperar um usuário');
});

routes.put('/users/:id', (req, res) => {
    res.send('Atualizar um usuário');
});

routes.patch('/users/:id', (req, res) => {
    res.send('Atualizar a senha de um usuário');
});

routes.delete('/users/:id', (req, res) => {
    res.send('Excluir um usuário');
});

module.exports = routes;