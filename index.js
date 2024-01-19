'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/demo', {/*useUnifiedTopology: true, useNewUrlParser: true*/})
mongoose.connect('mongodb+srv://striper:ZQvSE%40tiZ%234X6Km@cluster0.yr5aoiu.mongodb.net/?retryWrites=true&w=majority', {/*useUnifiedTopology: true, useNewUrlParser: true*/})
	.then(()=>{
		console.log("Conexion a la base de datos establecida satisfactoriamente");
		//creacion del servidor
		app.listen(port,()=>{
			console.log("Servidor corriendo correctamente en la url localhost:3700");
		});
	})
	.catch(err =>console.log("error al conectarse a la base:"+err));