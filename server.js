const express = require('express');
const app = express();
const cors = require('./src/config/cors');
const routes = require('./src/routes');

app.use(express.json());
app.use(cors);
app.use('/', routes);

app.listen(3000);