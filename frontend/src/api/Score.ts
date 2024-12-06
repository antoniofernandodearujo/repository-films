import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

class ScoreAPI {
    private apiUrl = 'http://localhost:8080/api/avaliacoes'; // URL base da API

    // Função para criar uma nova avaliação
    async createScore(data: { score: number; filmeId: string; usuarioId: string, comentario?: string }) {
        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage

            const response = await axios.post(this.apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
                },
            });

            return response.data; // Retorna os dados da resposta
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Imprimir o erro completo para tentar entender a origem
                console.error('Erro ao criar avaliação:', error.response ? error.response.data : error.message);
                if (error.response) {
                    // Log detalhado do erro para depuração
                    console.error("Detalhes do erro:", error.response.status, error.response.data);
                }
            } else {
                console.error('Erro ao criar avaliação:', error);
            }
            throw error; // Re-throw do erro para tratamento posterior
        }
    }

    // Função para buscar a média de avaliações de um filme
    async scoreFilmMedia(idFilm: string) {
        try {
            const response = await axios.get(`${this.apiUrl}/score/${idFilm}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error('Erro ao buscar média de avaliação:', error);
            throw error;
        }
    }
}

export default new ScoreAPI(); // Exporta uma instância da classe ScoreAPI
