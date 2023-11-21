const { compare } = require("bcrypt");
const { prisma } = require("../../database/PrismaClient");
const { sign } = require("jsonwebtoken");

class Login {
  async execute({ senha, email }) {

    const userValido = await prisma.user.findFirst({
      where: { email },
    });

    if (!userValido) {
      return new Error("email não encotrado");
    }
    if (userValido) {
      const senhaMatch = await compare(senha, userValido.senha);
      if (!senhaMatch) {
        return new Error("email de usuário ou senha inválido");
      }
    
      const usuarioAtualizado = await prisma.user.update({
        where: { id: userValido.id },
        data: { ultimoLogin: new Date() },
      });

  
      const token = sign({ email }, "chavesecreta", {
        subject: userValido.id,
        expiresIn: "1d",
      });
      const id = usuarioAtualizado.id
      const dataCriacao = usuarioAtualizado.dataCriacao
      const dataAtualizacao= usuarioAtualizado.dataAtualizacao
      const ultimoLogin = usuarioAtualizado.ultimoLogin
      
      return { id,dataCriacao,dataAtualizacao,ultimoLogin,token };
    }
  }
}

module.exports = { Login };
