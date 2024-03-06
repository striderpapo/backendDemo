'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var routerProducto = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware= multipart();

routerProducto.post('/sproduc',ProductoController.saveProduct);
routerProducto.get('/gproduc/:username?',ProductoController.getProducto);
routerProducto.delete('/dproduc/:id?',ProductoController.deleteProducto);
routerProducto.put('/eproduc/:id',ProductoController.updateProduct);
routerProducto.post('/uImageProd/:id/:agrego',multipartMiddleware ,ProductoController.uploadImageproduct);



module.exports = routerProducto;