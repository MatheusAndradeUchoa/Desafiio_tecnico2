const { Request, Response } = require('express');
const cadastrarUsuario = require('./creatUser');

class CriarClienteController {
  async handle(req, res) {
    const { nome, email, senha, telefone } = req.body;

    try {
      const result = await cadastrarUsuario(nome, email, senha, telefone);

      if (result instanceof Error) {
        return res.status(400).json({ error: result.message });
      }

      return res.json(result);
    } catch (error) {
      console.error('Erro no controller:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new CriarClienteController();