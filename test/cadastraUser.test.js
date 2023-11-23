const cadastrarUsuario = require('../src/modules/creatUser/creatUser');
const { prisma } = require('../src/database/PrismaClient');
const { hash } = require('bcrypt');

describe('cadastrarUsuario', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Deve cadastrar um novo usuário', async () => {
    const nome = 'Teste Usuario';
    const email = 'teste@email.com';
    const senha = 'senha123';
    const telefones = [{ "numero": 123456789, "ddd": 11 }];

    const result = await cadastrarUsuario(nome, email, senha, telefones);

    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(nome);
    expect(result.email).toBe(email);
    expect(result.telefone[0].numero).toBe(123456789);
    expect(result.telefone[0].ddd).toBe(11);
  });

  test('Deve retornar erro se o usuário já existir', async () => {
    const nome = 'Teste Usuario';
    const email = 'teste@email.com';
    const senha = 'senha123';
    const telefones = [{ "numero": 123456789, "ddd": 11 }];

    await cadastrarUsuario(nome, email, senha, telefones);

    const result = await cadastrarUsuario(nome, email, senha, telefones);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Usuário já existe');
  });
});