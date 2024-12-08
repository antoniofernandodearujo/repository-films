import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import filmeRoutes from './routes/filmeRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import scoreRoutes from './routes/scoreRoutes';
import bd from './db/config';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para habilitar CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Rotas da aplicação
app.use('/api/filmes', filmeRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/avaliacoes', scoreRoutes);

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Sincroniza o banco de dados
    await bd.sync();
    // Inicia o servidor na porta especificada
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};

// Inicia o servidor
startServer();
