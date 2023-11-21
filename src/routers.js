const { Router } = require('express');
const routes = Router();

const CriarClienteController = require('./modules/creatUser/creatUserController');
const LoginController  = require('./modules/Login/LoginController');
const AutenticacaoCliente = require('./modules/authenticationUser');

routes.post('/creat', AutenticacaoCliente,CriarClienteController.handle);
routes.post('/login', LoginController.handle);

module.exports = { routes };