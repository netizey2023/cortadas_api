const express = require('express');
const bodyParser = require('body-parser');
const captionsRoute = require('./routes/captionsRoute');

const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(bodyParser.json()); // ou app.use(express.json())

// Middleware de autenticação
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'kJLapRSt#VT') {
    return res.status(403).json({ error: 'API key inválida ou ausente.' });
  }
  next();
});

// Usar as rotas
app.use('/api/captions', captionsRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
