//PREPARACIÓN ===============================================================

//Definición de las dependencias

var express  = require('express'); //para la gestión de rutas
var mongoose = require('mongoose'); //para modUlar los objetos de MongoDB
var passport = require('passport'); //passprt es un middleware de autentificación.
var morgan = require ('morgan'); //para los mensajes de consola
var cookieParser = require('cookie-parser'); //para el uso de cookies, de manera que una vez logueados no tengamos que estar continuamente logueandonos en cada pagina 
var session = require('express-session'); //necesaria junto con cookie-parser. Podremos acceder a datos sobre la session (req.session.lastPage, etc)
var bodyParser = require('body-parser'); //para poder coger datos del html mediante el método POST, por ejemplo los formularios.


var app      = express(); //Se instancia una nueva variable llamado app para utilizar los método que contiene la dependencia express
//var port     = process.env.PORT || 3000; //Se configura el puerto
var configDB = require('./config/database.js'); //Se está configuran la base de datos. Estamos importando el archivo database.js que está en el directorio config


//CONFIGURACIÓN ===============================================================

//Conexión con la BD
mongoose.connect(configDB.url,function(err) {

	if(!err) {
		
		console.log('Conexión a la BD realizada'); 
	}
	else{

		console.log('ERROR: Conexión a la BD '+err);
	}
});

require('./config/passport')(passport); //le pasamos passport a passport.js (están en la carpeta de config) para poder usarlo. 


app.use(express.static(__dirname + '/public')); //indicamos el directorio público (para mostrar imagenes, css, etc)

//preparamos nuestra aplicación express
app.use(morgan('dev'));  //log de cada request en la consola
app.use(cookieParser()); //leer cookies (necesario para autentificación)
app.use(bodyParser()); //obtiene la información desde los formularios HTML

app.set('view engine', 'ejs'); //usamos ejs (Embedded JavaScript). Es un motor de plantillas. 

//necesario para passport 
app.use(session({ secret: 'pruebapp' })); // clave secret para usarla con hash (password encriptados)
app.use(passport.initialize()); //inicializamos passport
app.use(passport.session()); // persistent login sessions -> cookies peristentes: que no desaperecen cuando cierras el navegador


// RUTAS ======================================================================
//pasarle express y passport a routes.js (es donde están definido todas las rutas) para que pueda usarlos
require('./app/routes.js')(app, passport);
//Y ahora el controller.js que está dentro de la carpeta config




// ARRANQUE DEL SERVIDOR ======================================================================
/*app.listen(port);
console.log('The magic happens on port ' + port);*/

//Servidor Cloud9/OpenShift/local
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080 || 3000, ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, ip);
console.log('The magic happens on port ' + port);
