'use strict'

var Usuario=require('../models/usuario');
var fs=require('fs');
var path=require('path');
const cloudinary = require('cloudinary').v2;

var controller = {
	saveUsuario:function(req,res){
		var usuario = new Usuario();

		var params=req.body;
		console.log(params)
		usuario.username = params.username;
		usuario.password = params.password;
	
		
		/*usuario.save((err,usuarioStored)=>{
			if(err) return res.status(500).send({message:"Error al guardar al usuario"});

			if(!usuarioStored) return res.status(404).send({message:"No se ha podido guardar al usuario"});

			return res.status(200).send({usuario:usuarioStored});
		});*/


		usuario.save()
		.then(function (usuarioStored) {
  if(!usuarioStored) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  cloudinary.api.create_folder(usuarioStored._id, (error, result) => {
  if (error) {
    console.error('Error al crear la carpeta en Cloudinary:', error);
  } else {
    console.log('Carpeta creada exitosamente:', result);
    return res.status(200).send({usuario:usuarioStored});
  }
});
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al guardar al usuario"});
});
	},
	getUsuario:function(req,res){
		var Username= req.params.username;
		console.log(Username)
		/*Usuario.find({"usuario" :Username}).exec((err,usuario)=>{
			if(err) return res.status(500).send({message:"error al devolver los datos"});
	
			if(!usuario) return res.status(404).send({message:"no hay usuario para mostrar"});

			return res.status(200).send({usuario});
		})*/


			Usuario.find({"username" :Username})
		.then(function (usuario) {
  if(!usuario) return res.status(404).send({message:"No se ha podido guardar al usuario"});
  return res.status(200).send({user:usuario});
})
.catch(function (err) {
  if(err) return res.status(500).send({message:"Error al guardar al usuario"});
});
	}

};

module.exports=controller;