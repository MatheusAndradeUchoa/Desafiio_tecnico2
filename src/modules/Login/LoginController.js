const { Request, Response } = require("express");
const { Login } = require("./Login");

class LoginController {
  async handle(req, res) {
    const { email, senha } = req.body;
    const login = new Login();
    const resultado = await login.execute({
      email,
      senha,
    });
    if (resultado instanceof Error) {
      return res.status(400).json(resultado.message);
    }
    return res.json(resultado);
  }
}

module.exports = new LoginController();