const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function cadastrarUsuario(nome, email, senha, telefone) {
  try {
    // Validar se o usuário já existe
    const usuarioExistente = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (usuarioExistente) {
      return new Error('Usuário já existe');
    }

   
    const senhaHash = await hash(senha, 10);
    const novoUsuario = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        telefone,
      },
    });

    console.log('Usuário cadastrado com sucesso:', novoUsuario);
    return novoUsuario;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }


}
module.exports = cadastrarUsuario;