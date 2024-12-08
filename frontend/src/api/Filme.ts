import axios from "axios";
import { getAuthToken } from "@/utils/auth";
import { Movie } from "@/types/movieTypes";

// Classe para interagir com a API de filmes
export default class FilmeAPI {
  private apiUrl = 'http://repository-films-production.up.railway.app/api/filmes';

  // Método para listar todos os filmes
  async list() {
    try {
      const response = await axios.get(this.apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar filmes:", error);
      throw error;
    }
  }

  // Método para buscar filmes recomendados
  async listRecommended() {
    try {
      const response = await axios.get(`${this.apiUrl}/recommended`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar filmes recomendados:", error);
      throw error;
    }
  }

  // Método para buscar filmes com filtros
  async search(filters: { title?: string; genre?: string; year?: number }) {
    try {
      const response = await axios.post(`${this.apiUrl}/search`, filters); // Passando filtros no corpo
      return response.data;  // Retorna os filmes filtrados
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message); // Log da mensagem de erro
      } else {
        console.log("Erro desconhecido:", error);
      }
      throw error; // Lança o erro para que possa ser tratado posteriormente
    }
  }

  // Método para listar filmes por ID de usuário
  async listById() {
    const response = await axios.get(`${this.apiUrl}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }

  // Método para criar um novo filme
  async create(data: Movie) {
    try {
      console.log("Enviando dados para a API:", data); // Verifique os dados sendo enviados
      const response = await axios.post(this.apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log("Resposta da API:", response.data);  // Verifique a resposta da API
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Método para obter um filme por ID
  async getById(id: string) {
    const response = await axios.get(`${this.apiUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }

  // Método para atualizar um filme
  async update(id: string, data: Movie) {
    try {
      const response = await axios.patch(`${this.apiUrl}/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Método para deletar filme
  async delete(id: string) {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
