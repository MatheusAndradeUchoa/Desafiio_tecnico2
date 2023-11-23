# Documentação do Projeto

## Realizações

1. **Banco de Dados Postgres:**
   - Configurado banco de dados Postgres hospedado em servidor externo.

2. **Yarn:**
   - Utilizado Yarn como gerenciador de pacotes.

3. **Iniciar o Projeto:**
   - Executado `yarn start` para iniciar o projeto.

4. **Framework Express:**
   - Implementado utilizando o framework Express.

5. **Hospedagem:**
   - O projeto foi hospedado no vercel [Deploy da Aplicação](https://desafiio-tecnico2-git-main-matheusandradeuchoa.vercel.app).

6. **Testes:**
   - Desenvolvidos testes unitários para verificar a correta funcionalidade do sistema.

## Rotas

A seguir estão as rotas implementadas no projeto:

1. **Rota Principal:**
   - Endpoint: `/creat`
   - Método: POST
   - Entrada:
     ```json
     {
       "nome": "Nome do Usuário",
       "email": "usuario@gmail.com",
       "senha": "123",
       "telefone": [{"numero": 123456789, "ddd": 11}]
     }
     ```

2. **Rota de Autenticação:**
   - Endpoint: `/Login`
   - Método: POST
   - Entrada:
     ```json
     {
       "email": "usuario@gmail.com",
       "senha": "123"
     }
     ```

3. **Rota de Busca:**
   - Descrição: [Breve descrição da rota de busca]
   - Endpoint: `/buscar`
   - Método: GET
