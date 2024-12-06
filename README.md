## 🎬 Repository Films - Plataforma de Filmes
Bem-vindo ao Repository Films! Um repositório para armazenar, gerenciar e recomendar filmes, construído com as tecnologias mais modernas para garantir uma experiência dinâmica e escalável. 🚀

Este projeto é uma plataforma onde você pode visualizar, avaliar e recomendar filmes. Está disponível para uso e testes, e sempre em evolução! ⚡

### 🛠 Tecnologias Utilizadas
- Docker 🐳: Para containerização e facilidade na execução do projeto em qualquer ambiente.
- Node.js 🔥: Backend robusto para gerenciar as operações de CRUD, autenticação de usuários e recomendações.
- React ⚛️: Interface moderna e interativa, utilizando o Next.js para renderização eficiente e otimizada.
- PostgreSQL 🗄️: Banco de dados relacional para armazenar informações sobre filmes, usuários e avaliações.
  
### 🚀 Como Rodar o Projeto
#### Pré-requisitos
Antes de começar, você precisa ter o Docker instalado em sua máquina. Caso não tenha, siga as instruções em docker.com para instalar.

#### Rodando Localmente
1 - Clone o repositório:
```bash
git clone https://github.com/antoniofernandodearujo/repository-films.git
cd repository-films
```

2 - Crie e suba os containers Docker:
```bash
docker-compose up --build
```

O backend será iniciado na porta 8080 e o frontend na porta 3000.

Para acessar a aplicação, basta navegar até http://localhost:3000 no seu navegador. 🎉

### ⚙️ Funcionalidades
- Autenticação de Usuários: Usuários podem fazer login para acessar funcionalidades de criação e avaliação de filmes.
- CRUD de Filmes: Criação, leitura, atualização e exclusão de filmes.
- Recomendações: Sistema de recomendação baseado nas avaliações dos usuários.
- Avaliações: Usuários podem avaliar filmes com notas de 1 a 5.
  
### 📈 O que falta melhorar
Embora a plataforma esteja funcionando, ainda existem áreas para otimizar:

- Performance: Algumas partes do código podem ser melhoradas para maior desempenho, principalmente nas rotas de pesquisa e na renderização de listas de filmes.
- Testes: A cobertura de testes automatizados ainda não é a ideal.
- UI/UX: A interface está funcional, mas pode ser aprimorada para uma experiência de usuário mais fluida.
  
### 📋 Boas Práticas
Este repositório foi estruturado com boas práticas de desenvolvimento, buscando sempre a manutenibilidade e a escabilidade do código:

- Uso de componentes reutilizáveis no frontend.
- Organização modular no backend, com separação clara entre controllers, serviços e rotas.
- Docker para garantir a execução do ambiente de forma isolada e fácil.
- Envio de commits claros e descritivos, com mensagens que explicam as mudanças.
