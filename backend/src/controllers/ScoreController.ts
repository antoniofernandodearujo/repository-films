import { Request, Response } from 'express';
import ScoreFilme from '../models/ScoreFilme';
import Filme from '../models/Filme';

class ScoreController {
    /**
     * Cria uma nova avaliação para um filme.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     */
    async create(req: Request, res: Response): Promise<void> {
        const { score, comentario, filmeId, usuarioId } = req.body;

        // Validação do score
        if (typeof score !== 'number' || score < 1 || score > 5) {
            res.status(400).json({ message: 'A avaliação deve ser um número inteiro entre 1 e 5' });
            return;
        }

        try {
            // Verificar se o filme existe
            const filme = await Filme.findByPk(filmeId);
            if (!filme) {
                res.status(404).json({ message: 'Filme não encontrado' });
                return;
            }

            // Criar a avaliação
            const scoreFilme = await ScoreFilme.create({ score, comentario, filmeId, usuarioId });
            res.status(201).json(scoreFilme);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    /**
     * Obtém a média das avaliações e os comentários de um filme.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     */
    async getScoreByFilmeId(req: Request, res: Response): Promise<void> {
        const { filmeId } = req.params;
        console.log(filmeId);  // Verifique se está correto no console

        // Limpeza do UUID
        const cleanedFilmeId = filmeId.trim();  // Remove espaços extras ou quebras de linha

        try {
            // Verificar se o filme existe
            const filme = await Filme.findByPk(cleanedFilmeId);
            if (!filme) {
                res.status(404).json({ message: 'Filme não encontrado' });
                return;
            }

            // Buscar todas as avaliações para o filme
            const scores = await ScoreFilme.findAll({ where: { filmeId: cleanedFilmeId } });

            // Se não houver avaliações, retornar média 0
            if (scores.length === 0) {
                res.json({ mediaScore: 0, comentarios: [] });
                return;
            }

            // Calcular a soma total dos scores
            const totalScore = scores.reduce((sum, score) => sum + score.score, 0);

            // Calcular a média e arredondar para um número inteiro
            const mediaScore = Math.round(totalScore / scores.length);

            // Retornar a média e os comentários
            const comentarios = scores.map(score => score.comentario);
            res.json({ mediaScore, comentarios });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

export default new ScoreController();
