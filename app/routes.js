//Cargamos el modelo recetas
var Recetas = require('../app/models/recetas');

//module.exports es el objeto que se devuelve tras una llamada request
//así podemos usar express y passport obteniendo como parámetro
module.exports = function(app, passport) {

// RUTAS ===============================================================

	// =====================================
	// PAGINA PRINCIPAL ====================
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});


	// =====================================
	// REGISTRO ===========================
	// =====================================
	
	//Obtiene los datos del formulario del registro mediente el método POST.
	app.post('/signup', passport.authenticate('local-signup', {

		successRedirect : '/profile', //si los datos son correctos entraremos al perfil
		failureRedirect : '/', //si hay un error o los datos no son correctos redirecciona al index

	}));



	// =====================================
	// LOGIN ===============================
	// =====================================

	//Obtiene los datos del formulario del login mediente el método POST.
	app.post('/login', passport.authenticate('local-login', {

		successRedirect : '/profile', // si los datos son correctos entraremos al perfil
		failureRedirect : '/', // si hay un error o los datos no son correctos redirecciona al index

	}));


	// =====================================
	// PERFIL ==============================
	// =====================================

	//usamos la función isLoggedIn para verificar que el usario está logueado.
	//ya que no queremos que nadie pueda acceder al perfil sin haberse autentificado antes
	app.get('/profile', isLoggedIn, function(req, res) {

		res.render('profile.ejs', {

			user : req.user // cogemos el usuario de la session gracias a passport y se lo pasamos a la plantilla (profile.ejs)
		
		//Cierre del método render
		});

	//Cierre de la función	
	});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) { 

		req.logout(); //usamos req.logout() que nos proporciona passport. Sirve para salir de la sesión de usuario. 

		//Al cerrar la sesión, le redireccionamos a la página principal.
		res.redirect('/');

	//Cierre de la función
	});
	

	// =====================================
	// Recetas ==============================
	// =====================================

	//Añadir un documento a la colección de recetas
	app.post('/agregarRecetas', function(req, res) {

		//Creamos una variable para crear un objeto de tipo Recetas
		var recetas = new Recetas ({

			nombre: req.body.nombre,
			ingredientes: req.body.ingredientes

		});

		//Para guardar dicha instancia en la base de datos
		recetas.save(function (err, obj) {

			//Si no hay error
  			if (!err){

  				console.log(obj.nombre + ' ha sido guardado');

  			}else{
		      
		      	//Muestra por consola el errro
		    	console.log('ERROR: ' + err);

		  	}

		//Cierre del método save
		});
		
		
	//Cierre de la función
	});

	//Obtener la colección de recetas
	app.get('/listaRecetas', function(req, res) {
		
		Recetas.find({},function(err,recetas){
			
			//Si existe un error
			if(err){
				
				//Muestra por consola
				console.log(err);
			}
			else{

				//Muestra el objeto receta
				res.render('recetas', {
					
					recetas: recetas
					
				})
			
			//Cierre de else		
			}
		
		//Cierre del find
		});
		
	//Cierre de la función
	});
	
	//Borrar un documento a la colección de recetas
	app.post('/borrarRecetas', function(req, res) {


		//Creamos una variable para obtener el nombre del formulario de la receta a eliminar 
		var nombre = req.body.nombre;


		//Para borrar una receta mediante el nombre
		Recetas.remove({nombre: nombre},function (err) {

			//Si no hay error
  			if (!err){

  				console.log(nombre);
  				

  			}else{
		      
		      	//Muestra por consola el errro
		    	console.log('ERROR: ' + err);

		  }


		//Cierre del remove	
		});
		
	//Cierre de la función
	});

};

//Función para saber si aun sigue logueado
//Un usuario tiene que estar conectado para tener acceso a esta ruta. 
function isLoggedIn(req, res, next) {

	//si el usuario está logueado continuar
	if (req.isAuthenticated())
		return next();

	//si el usuario no está logueado y trata de acceder, redireccionamos a la página principal
	res.redirect('/');
}
