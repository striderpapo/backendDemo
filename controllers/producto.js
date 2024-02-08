'use strict'

var Producto=require('../models/producto');
var fs=require('fs');
var path=require('path');

var controller = {
	saveProduct:function(req,res){
		var producto = new Producto();

		var params=req.body;
		console.log(params)
		producto.nombre = params.nombre;
		producto.descripcion = params.descripcion;
		producto.nombreagrega = params.nombreagrega;
		
	
		
		/*usuario.save((err,usuarioStored)=>{
			if(err) return res.status(500).send({message:"Error al guardar al usuario"});

			if(!usuarioStored) return res.status(404).send({message:"No se ha podido guardar al usuario"});

			return res.status(200).send({usuario:usuarioStored});
		});*/


		producto.save()
		.then(function (productoStored) {
  if(!productoStored) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  return res.status(200).send({producto:productoStored});
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al guardar al usuario"});
});
	},
	getProducto:function(req,res){
		var Username= req.params.username;
		console.log(Username)
		/*Usuario.find({"usuario" :Username}).exec((err,usuario)=>{
			if(err) return res.status(500).send({message:"error al devolver los datos"});
	
			if(!usuario) return res.status(404).send({message:"no hay usuario para mostrar"});

			return res.status(200).send({usuario});
		})*/


			Producto.find({"nombreagrega" :Username})
		.then(function (producto) {
  if(!producto) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  return res.status(200).send({product:producto});
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al guardar al usuario"});
});
	},
	deleteProducto:function(req,res){
		var productoId=req.params.id;
		console.log(productoId)
		/*Producto.findByIdAndDelete(productoId,(err,productoRemoved)=>{
			if(err) return res.status(500).send({message:"no se ha podido borrar la prenda"});

			if(!productoRemoved) return res.status(404).send({message:"no se puede eliminar esta prenda"});
			console.log(productoRemoved)
			return res.status(200).send({producto:productoRemoved});
		});*/
		Producto.findByIdAndDelete(productoId)
		.then(function (productoRemoved) {
  if(!productoRemoved) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  return res.status(200).send({producto:productoRemoved});
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al eliminar al producto"});
});
	},
	updateProduct:function(req,res){
		var productId=req.params.id;
		var update=req.body;

		/*Producto.findByIdAndUpdate(productId,update,{new:true},(err,productUpdated)=>{
			if(err) return res.status(500).send({message:"error al actualizar"});

			if(!productUpdated) return res.status(404).send({message:"no existe el proyecto a actualizar "});

			return res.status(200).send({
				producto:productUpdated
			});
		});*/
		console.log(update)
		Producto.findByIdAndUpdate(productId,update,{new:true})
		.then(function (productoRemoved) {
  if(!productoRemoved) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  return res.status(200).send({producto:productoRemoved});
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al eliminar al producto"});
});
	}

};

module.exports=controller;