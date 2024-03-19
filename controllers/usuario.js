'use strict'

var Usuario=require('../models/usuario');
var fs=require('fs');
var path=require('path');
const cloudinary = require('cloudinary').v2;
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

var controller = {
	saveUsuario:function(req,res){
		var usuario = new Usuario();

		var params=req.body;
		console.log(params)
		usuario.username = params.username.toLowerCase();
		//usuario.password = params.password.toLowerCase();
		const encryptedPassword =  bcrypt.hashSync(params.password, 10);
		usuario.password = encryptedPassword;
		const token = jwt.sign(
      {_id: usuario._id,username:usuario.username},
      "Secret_key123",
      {}
    );

   		usuario.token=token;
		
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
	async getUsuario(req,res){
		try {
		//var Username= req.params.username;
		//var username= req.params.username;
		//var userpassword=req.params.password;
		var params=req.body;

		var username = params.username.toLowerCase();;
		var userpassword = params.password.toLowerCase();;
		console.log(username)
		console.log(userpassword)
		/*Usuario.find({"usuario" :Username}).exec((err,usuario)=>{
			if(err) return res.status(500).send({message:"error al devolver los datos"});
	
			if(!usuario) return res.status(404).send({message:"no hay usuario para mostrar"});

			return res.status(200).send({usuario});
		})*/

			const userapp = await Usuario.findOne({username });
			//console.log(userapp.password)
			 if (userapp  && (await bcrypt.compare(userpassword, userapp.password))) {
			 	console.log(userapp)
			 	const token = jwt.sign(
        {_id: userapp._id,username:userapp.username},
        "Secret_key123",
        {}
      );

      // save user token
      userapp.token = token;
      console.log(userapp)
      await Usuario.findByIdAndUpdate(userapp._id,userapp,{new:true})
      
      return res.status(200).send({token:token});
    }else{
    	return res.status(401).send("Unauthorized");
    }
		/*	Usuario.find({"username" :Username})
		.then(function (usuario) {
			console.log(usuario)
  if(!usuario) return res.status(404).send({message:"No se ha podido encontrar al usuario"});
  return res.status(200).send({user:usuario});
})
.catch(function (err) {
	console.log(err)
  if(err) return res.status(500).send({message:"Error al encontrar al usuario"});
});*/
} catch (err) {
    console.log(err);
  }
	},

};

module.exports=controller;