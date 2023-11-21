const { prisma } = require('../../database/PrismaClient');
const { hash } = require('bcrypt');


async function cadastrarUsuario(nome, email, senha, telefone) {
  try {
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

    return novoUsuario;

  } catch (error) {

    throw error;

  } finally {

    await prisma.$disconnect();
  }


}
module.exports = cadastrarUsuario;