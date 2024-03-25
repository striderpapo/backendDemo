'use strict'

var Usuario=require('../models/usuario');
var fs=require('fs');
var path=require('path');
const cloudinary = require('cloudinary').v2;
var bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');

var controller = {
	saveUsuario:function(req,res){
		var usuario = new Usuario();

		var params=req.body;
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

		var params=req.body;

		var username = params.username.toLowerCase();;
		var userpassword = params.password.toLowerCase();;

			const userapp = await Usuario.findOne({username });

			 if (userapp  && (await bcrypt.compare(userpassword, userapp.password))) {

			 	const token = jwt.sign(
        {_id: userapp._id,username:userapp.username},
        "Secret_key123",
        {}
      );

      // save user token
      userapp.token = token;
      
      await Usuario.findByIdAndUpdate(userapp._id,userapp,{new:true})
      
      return res.status(200).send({token:token});
    }else{
    	return res.status(401).send("Unauthorized");
    }
	
} catch (err) {
    console.log(err);
  }
	},

};

module.exports=controller;