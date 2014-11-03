//Este fichero está en la: app/models/user.js

// Cargamos las dependencias que necesitamos - mongoose y bcrypt-nodejs
var mongoose = require('mongoose'); //mongoose. Es una dependencia de la base de datos MongoDB. Sirve para modular los objetos de MongoDB. (ORM).
var bcrypt   = require('bcrypt-nodejs'); //Sirve para cifrar la contraseña

//Se define el schema que vamos a utilizar para los users
var userSchema= mongoose.Schema({

	//El id, el email y la contraseña se guardarán en el modelo antes de introducir a la base de datos
	_id: {
        $oid: String
    },
    local            : {
        email        : String,
        password     : String,
    }

});

//Genera el cifrado para las contraseñas
userSchema.methods.generateHash = function(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Para saber si la contraseña es válida
userSchema.methods.validPassword = function(password) {

    return bcrypt.compareSync(password, this.local.password);
};


//Se exporta el modelo creado para los usuarios
module.exports = mongoose.model('User', userSchema);
