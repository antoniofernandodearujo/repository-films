"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScoreFilme_1 = __importDefault(require("../models/ScoreFilme"));
const Filme_1 = __importDefault(require("../models/Filme"));
class ScoreController {
    /**
     * Cria uma nova avaliação para um filme.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { score, comentario, filmeId, usuarioId } = req.body;
            // Validação do score
            if (typeof score !== 'number' || score < 1 || score > 5) {
                res.status(400).json({ message: 'A avaliação deve ser um número inteiro entre 1 e 5' });
                return;
            }
            try {
                // Verificar se o filme existe
                const filme = yield Filme_1.default.findByPk(filmeId);
                if (!filme) {
                    res.status(404).json({ message: 'Filme não encontrado' });
                    return;
                }
                // Criar a avaliação
                const scoreFilme = yield ScoreFilme_1.default.create({ score, comentario, filmeId, usuarioId });
                res.status(201).json(scoreFilme);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    /**
     * Obtém a média das avaliações e os comentários de um filme.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     */
    getScoreByFilmeId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filmeId } = req.params;
            console.log(filmeId); // Verifique se está correto no console
            // Limpeza do UUID
            const cleanedFilmeId = filmeId.trim(); // Remove espaços extras ou quebras de linha
            try {
                // Verificar se o filme existe
                const filme = yield Filme_1.default.findByPk(cleanedFilmeId);
                if (!filme) {
                    res.status(404).json({ message: 'Filme não encontrado' });
                    return;
                }
                // Buscar todas as avaliações para o filme
                const scores = yield ScoreFilme_1.default.findAll({ where: { filmeId: cleanedFilmeId } });
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
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.default = new ScoreController();
