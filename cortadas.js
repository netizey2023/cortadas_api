// cortadas.js
const express = require('express');
const bodyParser = require('body-parser');
const captionsRoute = require('./routes/captionsRoute'); // importar rotas

const app = express();
const port = 3008;

// Middleware para processar o body das requisições em JSON
app.use(bodyParser.json());

// Rota para a API de legendas
app.use('/api/captions', captionsRoute);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
