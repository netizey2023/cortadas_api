const express = require('express');
const bodyParser = require('body-parser');
const captionsRoute = require('./routes/captionsRoute');

const app = express();
const port = 3008;

// Valor da API Key
const API_KEY = 'kJLapRSt#VT';

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(403).json({ error: 'API key ausente' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'API key inválida' });
  }

  // Se passar na verificação, prossegue
  next();
};

// Middleware para processar body em JSON
app.use(bodyParser.json());

// Usar o middleware de autenticação em todas as rotas da API
app.use(authenticate);

// Rotas da API de legendas
app.use('/api/captions', captionsRoute);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

