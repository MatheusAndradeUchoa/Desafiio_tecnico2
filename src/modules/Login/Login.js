const { compare } = require("bcrypt");
const { prisma } = require("../../database/PrismaClient");
const { sign } = require("jsonwebtoken");

class Login {
  async execute({ senha, email }) {

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      const senhaMatch = await compare(senha, user.senha);
      if (!senhaMatch) {
        return new Error("email de usuário ou senha inválido");
      }

      const token = sign({ email }, "chavesecreta", {
        subject: user.id,
        expiresIn: "1d",
      });
      return { token};
    }

    if (!user) {
      return new Error("Email ou senha inválido");
    }
  }
}

module.exports = { Login };
