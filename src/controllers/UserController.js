const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async login(req, res) {
        res.send('Recuperar todos os usuários');
    },
};