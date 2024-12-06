import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Filme from '../models/Filme';
import ScoreFilme from '../models/ScoreFilme';

class FilmeController {
    // Cria um novo filme
    async create(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.user); // Verifique o conteúdo de req.user
            if (!req.user || !req.user.id) {
                res.status(400).json({ message: 'Usuário não autenticado' });
                return; // Retorna se o usuário não estiver autenticado
            }
    
            const filmeData = {
                ...req.body,
                userId: req.user.id // A propriedade correta aqui deve corresponder ao modelo
            };
    
            console.log('Filme Data:', filmeData); // Log do que está sendo enviado
    
            const filme = await Filme.create(filmeData);
            res.status(201).json(filme);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
    
    // Atualiza um filme existente
    async update(req: Request, res: Response): Promise<void> {
        try {
            const filme = await Filme.findByPk(req.params.id);
            if (!filme) {
                res.status(404).json({ message: 'Filme não encontrado' });
                return; // Retorna para evitar continuar a execução
            }

            await filme.update(req.body); // Aceita campos parciais
            res.json(filme);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Lista todos os filmes
    async list(req: Request, res: Response): Promise<void> {
        try {
            const filmes = await Filme.findAll();
            res.json(filmes);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Lista filmes por usuário autenticado
    async listByUser(req: Request, res: Response): Promise<void> {
        const userId = req.user ? req.user.id : null; // Verifica se req.user está definido
        if (!userId) {
            res.status(400).json({ message: 'Usuário não autenticado' });
            return;
        }
        try {
            const filmes = await Filme.findAll({ where: { userId } });
            res.json(filmes);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Remove um filme
    async remove(req: Request, res: Response): Promise<void> {
        try {
            const filme = await Filme.findByPk(req.params.id);
            if (!filme) {
                res.status(404).json({ message: 'Filme não encontrado' });
                return; // Retorna para evitar continuar a execução
            }

            await filme.destroy();
            res.json({ message: 'Filme removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Busca filmes com base em filtros
    async search(req: Request, res: Response): Promise<void> {
        const { title, genre, year } = req.body; // Usar o body da requisição
        const where: any = {};  // Filtro condicional
    
        // Adicionar cada condição de filtro, se o campo estiver presente
        if (title) where.title = { [Op.iLike]: `%${title}%` };  // Filtro por título, agora case-insensitive
        if (genre) where.genre = { [Op.iLike]: `%${genre}%` };
        if (year) where.year_lance = year;  // Filtro por ano de lançamento, como é um número, não há distinção de case
    
        try {
            // Buscar filmes no banco de dados aplicando os filtros
            const filmes = await Filme.findAll({ where });
            res.json(filmes);  // Retornar os filmes filtrados
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });  // Em caso de erro
        }
    }

    // Obtém filmes recomendados com base nas avaliações
    async getRecommended(req: Request, res: Response): Promise<void> {
        try {
            // Busca todos os filmes
            const filmes = await Filme.findAll();

            // Para cada filme, calcular a média das avaliações
            const recommendedMovies = [];
            for (const filme of filmes) {
                const scores = await ScoreFilme.findAll({ where: { filmeId: filme.id } });
                if (scores.length > 0) {
                    const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
                    const mediaScore = totalScore / scores.length;

                    // Filtrar apenas filmes com média de 4 ou superior
                    if (mediaScore >= 4) {
                        recommendedMovies.push({
                            ...filme.toJSON(),
                            mediaScore: Math.round(mediaScore)
                        });
                    }
                }
            }

            res.json(recommendedMovies);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new FilmeController();
