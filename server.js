
//Preparación ================================

//cogemos todas las herramientas que vamos a necesitar

var express = require('express'); //para la gestión de rutas
var mongoose = require('mongoose'); //para modelar los objetos de MongoDB
var passport = require('passport'); //para autentificarnos
var flash = require('connect-flash'); //para mostrar mensajes flash
var morgan = require ('morgan'); //para los mensajes de consola
var cookieParser = require('cookie-parser'); //para el uso de cookies, de manera que una vez logueados no tengamos que estar continuamente logueandonos en cada pagina 
var session = require('express-session'); //necesaria junto con cookie-parser. Podremos acceder a datos sobre la session (req.session.lastPage, etc)
var bodyParser = require('body-parser'); //para poder coger datos del html, como por ejemplo datos de formularios


var app = express();
var port = process.env.PORT || 3000;
var configDB = require('./config/database.js');

//Configuración ======================================

//conexión con la BD
mongoose.connect(configDB.url,function(err) {

	if(!err) {
		
		console.log('Conexión a la BD realizada'); 
	}
	else{

		console.log('ERRO: Conexión a la BD '+err);
	}
});

require('./config/passport')(passport); //le pasamos passport a passport.js para poder usarlo

app.use(express.static(__dirname + '/public')); //indicamos el directorio público (para mostrar imagenes, css, etc)

//preparamos nuestra aplicación express
app.use(morgan('dev')); //log de cada request en la consola
app.use(cookieParser()); //leer cookies (necesario para autentificación)
app.use(bodyParser()); //coger información de formularios HTML

app.set('view engine', 'ejs'); //usamos ejs como plantilla 

//necesario para passport
app.use(session({ secret: 'sheli-foodjoy' })); // clave secret para usarla con hash
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!make sure those files never touch your repository so that your secret data stays secret.!!!!!!!!
//http://stackoverflow.com/questions/18565512/importance-of-session-secret-key-in-express-web-framework
app.use(passport.initialize()); //inicializamos passport
//mas datos: http://toon.io/understanding-passportjs-authentication-flow/
app.use(passport.session()); // persistent login sessions -> cookies peristentes: que no desaperecen cuando cierras el navegador
app.use(flash()); // para mostrar mensajes flash

//routes =======================
require('./app/routes.js')(app, passport); 
//pasarle express y passport a routes.js para que pueda usarlos

//puesta en marcha del servidor ========================
app.listen(port);
console.log('The magic happens on port ' + port);


