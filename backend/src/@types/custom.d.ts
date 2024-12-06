import { UserPayload } from './payload';

// Declaração global para adicionar propriedades personalizadas ao objeto Request do Express
declare global {
    namespace Express {
        interface Request {
            // Adiciona a propriedade opcional 'user' do tipo UserPayload ao objeto Request
            user?: UserPayload;
        }
    }
}

export {};
