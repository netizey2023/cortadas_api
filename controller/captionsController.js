const { getSubtitles } = require('youtube-captions-scraper');

const getCaptions = async (req, res) => {
  try {
    // Verificar o corpo da requisição
    console.log('Requisição recebida:', req.body);

    // Verificar se o videoID foi enviado corretamente
    const { videoID } = req.body;

    if (!videoID) {
      console.error('Erro: O ID do vídeo não foi fornecido.');
      return res.status(400).json({ error: 'O ID do vídeo é obrigatório.' });
    }

    console.log(`ID do vídeo recebido: ${videoID}`);

    // Buscar legendas no formato array
    const captions = await getSubtitles({
      videoID: videoID,
      lang: 'pt' // Alterar o idioma conforme necessário
    });

    // Se não houver legendas, retornar erro
    if (!captions || captions.length === 0) {
      console.error('Erro: Nenhuma legenda encontrada para o vídeo.');
      return res.status(404).json({ error: 'Nenhuma legenda encontrada para o vídeo.' });
    }

    // Sucesso: Retornar o array com as legendas
    console.log('Legendas extraídas com sucesso:', captions);
    return res.status(200).json(captions);

  } catch (error) {
    console.error('Erro interno ao buscar legendas:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar legendas.' });
  }
};

module.exports = {
  getCaptions
};
