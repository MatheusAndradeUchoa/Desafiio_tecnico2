const { Request, Response } = require('express');
const { BuscarCliente } = require('./findUser');

class BuscarUserController {
    async handle(req, res) {
      const { id_user } = req;
  
    
  
      try {
        const result = await BuscarCliente(id_user);
       
        return res.json(result);

      } catch (error) {
        console.error("Erro ao lidar com a busca de cliente:", error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }
  


module.exports = new BuscarUserController();