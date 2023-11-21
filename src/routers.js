const { Router } = require('express');
const routes = Router();

const CriarClienteController = require('./modules/creatUser/creatUserController');
const LoginController  = require('./modules/Login/LoginController');
const AutenticacaoCliente = require('./modules/authenticationUser');
const BuscarUserController = require('./modules/findUser/findUserController')


routes.post('/creat', AutenticacaoCliente,CriarClienteController.handle);
routes.get('/buscar', AutenticacaoCliente, BuscarUserController.handle );
routes.post('/login', LoginController.handle);

module.exports = { routes };