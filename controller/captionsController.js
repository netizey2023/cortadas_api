// controller/captionsController.js
const { getSubtitles } = require('youtube-captions-scraper');

const getCaptions = async (req, res) => {
  const { videoLink } = req.body;

  if (!videoLink) {
    return res.status(400).json({ error: 'O link do vídeo é obrigatório.' });
  }

  // Extrair o ID do vídeo do link
  const videoID = getVideoIDFromLink(videoLink);

  if (!videoID) {
    return res.status(400).json({ error: 'Link do vídeo inválido.' });
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

// Função para extrair o ID do vídeo do YouTube a partir do link
function getVideoIDFromLink(link) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = link.match(regex);
  return match ? match[1] : null;
}

module.exports = {
  getCaptions
};
