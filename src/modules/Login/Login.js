const { compare } = require("bcrypt");
const { prisma } = require("../../dataBase/prismaCliente");
const { sign } = require("jsonwebtoken");

class Login {
  async execute({ senha, email }) {
    const cliente = await prisma.cliente.findFirst({
      where: { email },
    });

    const usuario = await prisma.usuario.findFirst({
      where: { email },
    });

    if (cliente) {
      const senhaMatch = await compare(senha, cliente.senha);
      if (!senhaMatch) {
        return new Error("Nome de usuário ou senha inválido");
      }

      const token = sign({ email }, "chavesecretacliente", {
        subject: cliente.id,
        expiresIn: "1d",
      });
      return { token, tipo: 1 };
    }

    if (usuario) {
      const senhaMatch = await compare(senha, usuario.senha);
      if (!senhaMatch) {
        return new Error("Nome de usuário ou senha inválido");
      }

      const token = sign({ email }, "chavesecreta", {
        subject: usuario.id,
        expiresIn: "30m",
      });
      return { token };
    }

    if (!usuario && !cliente) {
      return new Error("Email ou senha inválido");
    }
  }
}

module.exports = { Login };
