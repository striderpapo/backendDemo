'use strict'

var Producto=require('../models/producto');
var Usuario=require('../models/usuario');
var fs=require('fs');
var path=require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dnzgfrtp7',
  api_key: '831364683849261',
  api_secret: 'v3GC7jYfzlRnFafaUpUVQT8BzjY'
});

var controller = {
	saveProduct:function(req,res){
		var producto = new Producto();
		var params=req.body;
	
		producto.nombre = params.nombre;
		producto.descripcion = params.descripcion;
		producto.nombreagrega = params.nombreagrega;
		producto.imageproducto=null
	
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

		Producto.findByIdAndDelete(productoId)
		.then(function (productoRemoved) {
  if(!productoRemoved) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  console.log(productoRemoved.imageproducto)
  const imagesplit = productoRemoved.imageproducto.split('/');
  console.log(imagesplit[7])
  console.log(imagesplit[8].split(".")[0])
cloudinary.uploader.destroy(`${imagesplit[7]}/${imagesplit[8].split(".")[0]}`)
.then(result => {
	console.log("Imagen borrada:", result);
	console.log("97")
	console.log(result)
	return res.status(200).send({producto:productoRemoved});
  })
  .catch(error => {
	console.error("Error al borrar la imagen:", error);
  });
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al eliminar al producto"});
});
	},
	updateProduct:function(req,res){
		var productId=req.params.id;
		var update=req.body;

	Producto.findByIdAndUpdate(productId,update,{new:true})
	.then(function (productoRemoved) {
  		if(!productoRemoved) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  		return res.status(200).send({producto:productoRemoved});
	})
	.catch(function (err) {
  		if(err) return res.status(500).send({message:"Error al eliminar al producto"});
	});
},
		
uploadImageproduct(req,res){
		var productoId=req.params.id;
		var nombreagrego=req.params.agrego;
		var fileName="Imagen no subida";

		if(req.files){
			var filePath = req.files.imageproducto.path;
			var fileSplit = filePath.split('\.');
			var fileName = fileSplit[0];
			//var extSplit = fileName.split('\.');
			var fileExt = fileSplit[1];
			if(fileExt == 'png' || fileExt == 'jpg'|| fileExt == 'jpeg'|| fileExt=='gif'){

Usuario.find({"username" :nombreagrego}, { _id: 1})
		.then(function (usuario) {
  if(!usuario) return res.status(404).send({message:"No se enceontro el usuario"});
 
  cloudinary.uploader.upload(filePath,{folder: usuario[0]._id+'/'}, (error, result) => {
  				if(error){
    				console.error(error);
  				}else{
						Producto.findByIdAndUpdate(productoId,{imageproducto:result.url},{new:true})
						.then(function (imageproductUpdate) {
				  		if(!imageproductUpdate) return res.status(404).send({message:"No se ha podido guardar al usuario"});
				  			return res.status(200).send({producto:imageproductUpdate});
							})
						.catch(function (err) {
				  		if(err) return res.status(500).send({message:"Error al eliminar al producto"});
						});
  }
});

})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al guardar al usuario"});
});
			}else{
					return res.status(200).send({message:'La extension no es valida'})
			}
		}else{
			return res.status(200).send({
				message:fileName
		});
	}
}

};

module.exports=controller;