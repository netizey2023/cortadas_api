const express = require('express');
const router = express.Router();
const captionsController = require('../controller/captionsController');

// Agora usamos o parâmetro :videoID na URL
router.get('/:videoID', captionsController.getCaptions);

module.exports = router;
