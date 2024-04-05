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
		console.log(params)
		producto.nombre = params.nombre;
		producto.descripcion = params.descripcion;
		producto.nombreagrega = params.nombreagrega;
		producto.imageproducto=null
		
	
		
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
	},
		uploadImageproduct(req,res){
		var productoId=req.params.id;
		var nombreagrego=req.params.agrego;
		var fileName="Imagen no subida";
		console.log(productoId)
		console.log(nombreagrego)
		console.log(req.files.imageproducto.path)
		if(req.files){
			var filePath = req.files.imageproducto.path;
			console.log(filePath)
			var fileSplit = filePath.split('\.');
			console.log(fileSplit)
			var fileName = fileSplit[0];
			console.log(fileName)
			//var extSplit = fileName.split('\.');
			var fileExt = fileSplit[1];
			console.log(fileExt)
			if(fileExt == 'png' || fileExt == 'jpg'|| fileExt == 'jpeg'|| fileExt=='gif'){

Usuario.find({"username" :nombreagrego}, { _id: 1})
		.then(function (usuario) {
  if(!usuario) return res.status(404).send({message:"No se enceontro el usuario"});
  console.log(usuario[0]._id)
 
  cloudinary.uploader.upload(filePath,{folder: usuario[0]._id+'/'}, (error, result) => {
  				if(error){
    				console.error(error);
  				}else{
    //console.log(result.url);
				    console.log('Imagen subida exitosamente.');
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