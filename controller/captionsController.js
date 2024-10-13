const { getSubtitles } = require('youtube-captions-scraper');

const getCaptions = async (req, res) => {
  const { videoID } = req.body; // Agora pegamos o videoID diretamente

  if (!videoID) {
    return res.status(400).json({ error: 'O ID do vídeo é obrigatório.' });
  }

  try {
    // Buscar legendas no formato array
    const captions = await getSubtitles({
      videoID: videoID,
      lang: 'pt' // Alterar o idioma conforme necessário
    });

    // Retornar o array com as legendas
    return res.status(200).json(captions);
  } catch (error) {
    console.error('Erro ao buscar legendas:', error);
    return res.status(500).json({ error: 'Erro ao buscar legendas.' });
  }
};

module.exports = {
  getCaptions
};
