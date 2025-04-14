# 💸 PicPay Simplificado - API de Pagamentos

Esta API simula uma plataforma de pagamentos simplificada, inspirada no PicPay. É possível realizar depósitos e transferências entre usuários comuns e lojistas, com regras de negócio específicas para cada tipo.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [JWT](https://jwt.io/)
- [Axios](https://axios-http.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Docker](https://www.docker.com/)

---
### Passos para Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/SamuelColaco/API-Daily-Diet.git

2. **Ir para o Diretório**
    ```bash
    cd API-Refund
3. **Instalar as Dependências**
    ```bash
    npm install
4. **Crie um arquivo .env na raiz do projeto**
    E coloque nele essas variavéis de ambiente

    DATABASE_URL="escreva a url do banco de dados aqui (postgresql://user:password@db:5432/refund)"
    AUTH_SECRET="Escreva seu secret aqui"
5. **Rode o Servidor**
    ```bash
    npm run dev
    'O servidor estará disponivél em http://localhost:3333'

## Docker

- **Comando para rodar o docker-compose**
    ```docker
    docker-compose up -d
- **Comando para verificar o container rodando**
    ```docker
    docker ps ou docker-compose ps
- **Comando para parar o container**
    ```docker
    docker-compose down


## 🧱 Entidades

### 🧍‍♂️ NormalUser

Usuários comuns podem transferir e receber dinheiro.

Campos obrigatórios:
- `name`: string
- `email`: string (único)
- `password`: string
- `CPF`: string (único)
- `balance`: number (inicialmente zero)

### 🧑‍💼 Seller

Usuários do tipo lojista, que apenas **recebem** dinheiro.

Campos obrigatórios:
- `name`: string
- `email`: string (único)
- `password`: string
- `CNPJ`: string (único)
- `balance`: number

### 🔐 Session

Responsável por autenticação de usuários (`JWT`).

- Rota: `POST /session`
- Corpo: `{ email, password }`

### 💸 Transaction

Realiza a transferência de dinheiro entre usuários ou para lojistas.

Campos obrigatórios:
- `payerId`: ID do remetente
- `payeeId`: ID do destinatário (caso usuário comum)
- `sellerId`: ID do destinatário (caso lojista)
- `amount`: valor da transferência

---


## 📌 Rotas

### 🔐 Sessão

    URL: /session
    Propósito: Cria um token JWT
    Body: {
        "email":"email do usuário",
        "password":"senha do usuário"
    }
    Message: {
	"token": "Token JWT aparece_aqui"
    }
    StatusCode: 201(Created)

     URL: /user
    Propósito: Cria um novo usuário
    Body: {
        "name": "João",
        "email": "joao@email.com",
        "password": "senha123",
        "CPF": "12345678900"
    }
    Message: {
        "Usuário cadastrado"
    }
    StatusCode: 201(Created)

    URL: /seller
    Propósito: Cadastra um vendedor
    Body: {
        "name": "Loja X",
        "email": "loja@email.com",
        "password": "senha123",
        "CNPJ": "12345678000199"
    }

    Header: 
        Authorization: Bearer seu_token_aqui
    Message: {
        "Usuário Criado"
    }
    StatusCode: 201(Created)

    URL: /transcation/payeeId
    Propósito: Realiza transação
    Body: {
        "amount": 50
    }

    Header: 
        Authorization: Bearer seu_token_aqui
    Message: {
        "value": valor,
        "payer": "id do pagador",
        "payee": id de quem recebeu"
    }

    StatusCode: 201(Created)

    
    URL: /transcation/sellerId
    Propósito: Realiza transação
    Body: {
        "amount": 50
    }

    Header: 
        Authorization: Bearer seu_token_aqui
    Message: {
        "value": valor,
        "payer": "id do pagador",
        "payee": id de quem recebeu"
    }

    StatusCode: 201(Created)


 GET
    URL: /user
    Propósito: Lista todos os usuários
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: [
	{
		"id": "Id do usuário em formato UUID",
		"name": "Nome",
		"email": "email",
		"password_hash": "Senha em formato HASH: $2b$08$aRjpep6EFNnHSBVctXG09.ALi0Y87hlC52Eb5aURXTVhNCB9ugw46",
        "CPF": "cpf do usuário"
		"balance": "Dinheiro em saldo"
		"createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		"updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
	},
    ]
    StatusCode: 200(Ok)

     URL: /sellers
     Propósito: Lista todos os vendedores
     Body: Não prescisa passar nada
     Header: 
        Authorization: Bearer seu_token_aqui
     Reposta: [
	{
		"id": "Id do usuário em formato UUID",
		"name": "Nome",
		"email": "email",
		"password_hash": "Senha em formato HASH: $2b$08$aRjpep6EFNnHSBVctXG09.ALi0Y87hlC52Eb5aURXTVhNCB9ugw46",
        "CNPJ": "cnpj do usuário"
		"balance": "Dinheiro em saldo"
		"createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		"updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
	},
    ]
    StatusCode: 200(Ok)

 PUT

    URL: /user/:id
    Prpósito: Atualiza um usuário
    Body: {
        Passa o quer atualizar do usuário, por exemplo: {
	        "password": "nova senha"
        }
    }
    Message: {
        "Usuário atualizado com sucesso"
    }
    StatusCode: 200(Ok)

    URL: /seller/:id
    Propósito: Atualiza um vendedor
    Body: {
        Passa o quer atualizar do vendedor, por exemplo: {
	        "name": "novo nome do vendedor"
        }
    }
    Message: {
        "Update feito com sucesso"
    }
    StatusCode: 200(Ok)

    
 Delete

    URL: /user/:id
    Prpósito: Deleta um usuário
    Body: Não passa nada
    Message: {
        "Deletado com sucesso"
    }
    StatusCode: 200(Ok)

    URL: /seller/:id
    Propósito: Deleta um usuário
    Body:  Não passa nada
    Message: {
        "Deletado com sucesso"
    }
    StatusCode: 200(Ok)
