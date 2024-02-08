'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var routerProducto = express.Router();



routerProducto.post('/sproduc',ProductoController.saveProduct);
routerProducto.get('/gproduc/:username?',ProductoController.getProducto);
routerProducto.delete('/dproduc/:id?',ProductoController.deleteProducto);
routerProducto.put('/eproduc/:id',ProductoController.updateProduct);



module.exports = routerProducto;