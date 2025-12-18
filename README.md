# 🐷 Museu AVANTI

Bem-vindo ao **Museu AVANTI**, um sistema Fullstack completo desenvolvido para celebrar a história da Sociedade Esportiva Palmeiras e permitir que torcedores montem e salvem suas escalações dos sonhos.

O projeto conta com uma API robusta em Node.js, autenticação segura, controle de acesso (Admin/User) e um Frontend interativo.

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
- **Cadastro e Login:** Usuários podem criar conta e fazer login.
- **Autenticação JWT:** Rotas protegidas via Token.
- **Controle de Acesso (RBAC):** Diferenciação entre usuários comuns (`USER`) e administradores (`ADMIN`).

### ⚽ Gerenciamento de Jogadores (API)
- **Listagem:** Qualquer usuário pode ver os jogadores disponíveis.
- **Administração:** Apenas usuários com role `ADMIN` podem:
  - Adicionar novos jogadores ao banco de dados.
  - Editar ou remover jogadores existentes.

### 🎮 Funcionalidades do Usuário (Frontend)
- **Linha do Tempo:** Visualização histórica de títulos e camisas por ano.
- **Montar Time:** Interface interativa (campinho) para escalar 11 jogadores.
- **Salvar Escalação:** O time montado é salvo no banco de dados vinculado ao usuário.
- **Busca:** Filtro de jogadores por nome.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** & **Express**: Servidor e API.
- **MongoDB** & **Mongoose**: Banco de dados NoSQL e modelagem de dados.
- **JWT (JsonWebToken)**: Segurança e autenticação.
- **BcryptJS**: Criptografia de senhas.
- **Jest**: Testes unitários e de integração.

### Frontend
- **HTML5 & CSS3**: Estrutura e estilização (Design Responsivo).
- **JavaScript (Vanilla)**: Lógica de conexão com a API e manipulação do DOM.
- **Bootstrap 5**: Componentes visuais e layout.

---

## 📦 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [MongoDB](https://www.mongodb.com/) rodando localmente ou uma URI do MongoDB Atlas.

### 1. Instalação
Clone o repositório e instale as dependências:

```bash
# Instale as dependências do backend
npm install