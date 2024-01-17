'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var routerUsuario = express.Router();



routerUsuario.post('/suser',UsuarioController.saveUsuario);
routerUsuario.get('/guser/:username?',UsuarioController.getUsuario);



module.exports = routerUsuario;