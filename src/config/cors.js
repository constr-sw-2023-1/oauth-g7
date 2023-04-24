const cors = require('cors');

const corsOptions = {
    origin: 'http://keycloak:8090/auth',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
