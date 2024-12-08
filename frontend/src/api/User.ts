import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

export default class UserAPI {
  private apiUrl = 'http://repository-films-production.up.railway.app/api/usuarios'; // URL base da API de usuários

  // Método para registrar um novo usuário
  async register(data: { name: string; email: string; password: string }) {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data; // Retorna os dados da resposta da API
    } catch (error) {
      console.error('Erro ao registrar:', error); // Loga o erro no console
      throw error; // Lança o erro para ser tratado pelo chamador
    }
  }

  // Método para fazer login de um usuário
  async login(data: { email: string; password: string }) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data; // Retorna os dados da resposta da API
    } catch (error) {
      console.error('Erro ao fazer login:', error); // Loga o erro no console
      throw error; // Lança o erro para ser tratado pelo chamador
    }
  }

  // Método para buscar um usuário por ID e retorna o nome
  async findNameById(id: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.name; // Retorna o nome do usuário
    } catch (error) {
      console.error('Erro ao buscar usuário:', error); // Loga o erro no console
      throw error; // Lança o erro para ser tratado pelo chamador
    }
  }
}