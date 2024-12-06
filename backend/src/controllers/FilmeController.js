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
const sequelize_1 = require("sequelize");
const Filme_1 = __importDefault(require("../models/Filme"));
const ScoreFilme_1 = __importDefault(require("../models/ScoreFilme"));
class FilmeController {
    // Cria um novo filme
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.user); // Verifique o conteúdo de req.user
                if (!req.user || !req.user.id) {
                    res.status(400).json({ message: 'Usuário não autenticado' });
                    return; // Retorna se o usuário não estiver autenticado
                }
                const filmeData = Object.assign(Object.assign({}, req.body), { userId: req.user.id // A propriedade correta aqui deve corresponder ao modelo
                 });
                console.log('Filme Data:', filmeData); // Log do que está sendo enviado
                const filme = yield Filme_1.default.create(filmeData);
                res.status(201).json(filme);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Atualiza um filme existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filme = yield Filme_1.default.findByPk(req.params.id);
                if (!filme) {
                    res.status(404).json({ message: 'Filme não encontrado' });
                    return; // Retorna para evitar continuar a execução
                }
                yield filme.update(req.body); // Aceita campos parciais
                res.json(filme);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Lista todos os filmes
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filmes = yield Filme_1.default.findAll();
                res.json(filmes);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Lista filmes por usuário autenticado
    listByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user ? req.user.id : null; // Verifica se req.user está definido
            if (!userId) {
                res.status(400).json({ message: 'Usuário não autenticado' });
                return;
            }
            try {
                const filmes = yield Filme_1.default.findAll({ where: { userId } });
                res.json(filmes);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Remove um filme
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filme = yield Filme_1.default.findByPk(req.params.id);
                if (!filme) {
                    res.status(404).json({ message: 'Filme não encontrado' });
                    return; // Retorna para evitar continuar a execução
                }
                yield filme.destroy();
                res.json({ message: 'Filme removido com sucesso' });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Busca filmes com base em filtros
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, genre, year } = req.body; // Usar o body da requisição
            const where = {}; // Filtro condicional
            // Adicionar cada condição de filtro, se o campo estiver presente
            if (title)
                where.title = { [sequelize_1.Op.iLike]: `%${title}%` }; // Filtro por título, agora case-insensitive
            if (genre)
                where.genre = { [sequelize_1.Op.iLike]: `%${genre}%` };
            if (year)
                where.year_lance = year; // Filtro por ano de lançamento, como é um número, não há distinção de case
            try {
                // Buscar filmes no banco de dados aplicando os filtros
                const filmes = yield Filme_1.default.findAll({ where });
                res.json(filmes); // Retornar os filmes filtrados
            }
            catch (error) {
                res.status(500).json({ message: error.message }); // Em caso de erro
            }
        });
    }
    // Obtém filmes recomendados com base nas avaliações
    getRecommended(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca todos os filmes
                const filmes = yield Filme_1.default.findAll();
                // Para cada filme, calcular a média das avaliações
                const recommendedMovies = [];
                for (const filme of filmes) {
                    const scores = yield ScoreFilme_1.default.findAll({ where: { filmeId: filme.id } });
                    if (scores.length > 0) {
                        const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
                        const mediaScore = totalScore / scores.length;
                        // Filtrar apenas filmes com média de 4 ou superior
                        if (mediaScore >= 4) {
                            recommendedMovies.push(Object.assign(Object.assign({}, filme.toJSON()), { mediaScore: Math.round(mediaScore) }));
                        }
                    }
                }
                res.json(recommendedMovies);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = new FilmeController();
