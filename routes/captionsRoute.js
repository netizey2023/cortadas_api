const express = require('express');
const router = express.Router();
const captionsController = require('../controller/captionsController');

// Definir rota POST para pegar legendas
router.post('/', captionsController.getCaptions);

module.exports = router;
