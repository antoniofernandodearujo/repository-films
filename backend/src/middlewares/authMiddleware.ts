import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../@types/payload';

// Middleware de autenticação
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Obtém o token do cabeçalho de autorização
    const token = req.headers.authorization?.split(' ')[1];

    // Verifica se o token foi fornecido
    if (!token) {
        res.status(403).json({ message: 'Token não fornecido' });
        return;
    }

    try {
        // Verifica e decodifica o token
        const decoded = await new Promise<UserPayload>((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded as UserPayload);
            });
        });

        // Armazena o usuário decodificado em req.user
        req.user = decoded;

        if (!req.user) {
            res.status(401).json({ message: 'Não autorizado' });
            return;
        }

        next();
    } catch (err) {
        // Retorna erro de não autorizado se a verificação falhar
        res.status(401).json({ message: 'Não autorizado' });
    }
};
