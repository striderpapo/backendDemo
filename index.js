'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
require('dotenv').config();

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/demo', {/*useUnifiedTopology: true, useNewUrlParser: true*/})
mongoose.connect(process.env.MONGO_URI, {
tls: true,
  })
	.then(()=>{
		console.log("Conexion a la base de datos establecida satisfactoriamente");
		//creacion del servidor
		//pass api key cloudinary v3GC7jYfzlRnFafaUpUVQT8BzjY
		app.listen(port,()=>{
			console.log("Servidor corriendo correctamente");
		});
	})
	.catch(err =>console.log("error al conectarse a la base:"+err));
	/*const db = mongoose.connection;
db.on('connected', () => {
  console.log('Conexión a MongoDB Atlas establecida');
  app.listen(port,()=>{
	console.log("Servidor corriendo correctamente en la url localhost:3700");
});
});
db.on('error', (err) => {
  console.error(`Error de conexión a MongoDB Atlas: ${err}`);
});*/