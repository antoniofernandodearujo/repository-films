import { Request, Response } from 'express';
import Usuario from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class UserController {
    // Método para registrar um novo usuário
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, password } = req.body;

            // Verifique se os dados do corpo estão corretos
            if (!nome || !email || !password) {
                res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
                return;
            }

            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);
            const usuario = await Usuario.create({ ...req.body, password: hashedPassword });
            
            // Gere o token JWT
            const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
            
            // Retorne o usuário e o token
            res.status(201).json({ usuario, token });
        } catch (error) {
            console.error(error); // Para fins de depuração
            res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    // Método para login de usuário
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
    
        console.log('Tentando logar usuário:', email); // Log do email
    
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            console.log('Usuário não encontrado'); // Log se não encontrar usuário
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }
    
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            console.log('Senha não coincide'); // Log se a senha não for válida
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }
    
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        console.log('Token gerado com sucesso:', token); // Log do token gerado
        res.status(200).json({ id: usuario.id, token });
    }

    // Método para obter usuário por ID
    async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        res.json({ nome: usuario.nome });
    }
}

export default new UserController();
