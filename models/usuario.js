'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	username:String,
	password:String,
	token:String,
	facebook_id:String,
}) ;

module.exports = mongoose.model('Usuario',UsuarioSchema);