const express = require('express');
const User = require('./src/models/User');

const app = express();
app.use(express.json());

app.use('/', require('./src/routes'));

app.listen(3001);