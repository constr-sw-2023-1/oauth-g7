const express = require('express');
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8090"
};

app.use(express.json()); //Permitir enviar dados no formato json
app.use(cors());

//Rotas
app.use('/api', require('./src/routes'));

app.listen(3000); //Aplicação rodará na porta 3000