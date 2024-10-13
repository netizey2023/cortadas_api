const express = require('express');
const bodyParser = require('body-parser');
const captionsRoute = require('./routes/captionsRoute');

const app = express();
const port = 3000;

// Valor da API Key
const API_KEY = 'kJLapRSt#VT';

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    console.error('Erro de autenticação: API key ausente');
    return res.status(403).json({ error: 'API key ausente.' });
  }

  if (apiKey !== API_KEY) {
    console.error('Erro de autenticação: API key inválida');
    return res.status(403).json({ error: 'API key inválida.' });
  }

  // Autenticação bem-sucedida
  next();
};

// Middleware para processar JSON
app.use(bodyParser.json()); // ou app.use(express.json())

// Usar o middleware de autenticação em todas as rotas da API
app.use(authenticate);

// Definir rotas da API
app.use('/api/captions', captionsRoute);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
