//Definimos los módulos que necesitamos
var express=require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//La carpeta public sirve para almacenar archivo con permisos publicos.
app.use(express.static(__dirname + '/public'));

//al método get le pasamos 2 parámetros. Uno es la raiz(/) y el otro es una función.
app.get('/', function(req, res){
	
	//La función obtiene 2 parámetros: req que es request(peticion) y el otro es res significa respond(respuesta).
	
	//Le decimos donde está el archivo index.html
	res.sendFile(__dirname + '/public/index.html');
	
});


//Obtener los parámetros desde el formulario con el método POST mostrando el array en distintas líneas
app.post('/user', function(req, res) {

    res.send('¡Felicidades <b>'+req.body.name [0]+ '</b>! <br /> Has sido registrada. <br /> Verifica si el apellido <b>'+req.body.name [1]+'</b> es correcto. <br /> Con el email <b>'+req.body.name [2]+'</b>');

});

//Creamos un array que mostrará mediante el método GET
app.get('/listaRecetas', function(req, res) {

	var recetas = {
		nombre : "Tortilla de patata",
		ingredientes: [
					"Huevos",
					"Patatas",
					"Sal"
				],
		foto: [
					"tortilla_patata.jpg"
				]
	};

	res.json(recetas);

});


//Configuración del servidor
//El numero del puerto la hemos guardado en una variable
var puerto=3000;

//el método listen de la aplicación enlazar y escucha las conexiones en un determinado puerto
var server=app.listen(puerto);

//Se muestra por consola un mensaje
console.log("Listening in port "+puerto);
