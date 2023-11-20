const express = require('express');
const { Router } = express;

const routes = Router();

const CriarClienteController = require('./modules/creatUser/creatUserController')

routes.post('/creat', CriarClienteController.handle)



module.exports = routes;