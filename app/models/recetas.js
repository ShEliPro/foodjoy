//Este fichero está en la: app/models/recetas.js

// Cargamos las dependencias que necesitamos - mongoose y bcrypt-nodejs
var mongoose = require('mongoose'); //mongoose. Es una dependencia de la base de datos MongoDB. Sirve para modular los objetos de MongoDB. (ORM).

var recetasSchema= mongoose.Schema({
	
	nombre        : String,
	ingredientes     : String,

});

//Se exporta el modelo 
module.exports = mongoose.model('Recetas', recetasSchema);