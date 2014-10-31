//Cargamos el modelo recetas
var Recetas = require('../app/models/recetas');

//module.exports es el objeto que se devuelve tras una llamada request
//así podemos usar express y passport pasando como parámetro
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
	
	//Obtiene los datos del formulario del registro autentificando el usuario
	app.post('/signup', passport.authenticate('local-signup', {

		successRedirect : '/profile', //si los datos son correctos entraremos al perfil
		failureRedirect : '/', //si hay un error o los datos no son correctos redirecciona a la página principal

	}));



	// =====================================
	// LOGIN ===============================
	// =====================================

	//Obtiene los datos del formulario del registro autentificando el usuario
	app.post('/login', passport.authenticate('local-login', {

		successRedirect : '/profile', // si los datos son correctos entraremos al perfil
		failureRedirect : '/', //si hay un error o los datos no son correctos redirecciona a la página principal

	}));


	// =====================================
	// PERFIL ==============================
	// =====================================

	//usamos la función isLoggedIn para verificar que el usario está logueado
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
	// RECETAS =============================
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

		  	//Si existe un error
			if(err){
				
				//Muestra por consola el error
		    	console.log('ERROR: ' + err);
			}
			else{

				//Muestra por consola el objeto recetas
				console.log(obj.nombre + ' ha sido guardado');
			
			//Cierre de else		
			}

		//Cierre del método save
		});		
		
	//Cierre de la función
	});


	//Obtener toda la colección de recetas
	app.get('/listaRecetas', function(req, res) {
		
		Recetas.find({},function(err,recetas){
			
			//Si existe un error
			if(err){
				
				//Muestra por consola
				console.log(err);
			}
			else{

				//Muestra el objeto recetas en la plantilla recetas.ejs
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

  				//Muestra por consola el mensaje
  				console.log(nombre + ' ha sido eliminado');
  								

  			}else{
		      
		      	//Muestra por consola el error
		    	console.log('ERROR: ' + err);

		  }


		//Cierre del remove	
		});
		
	//Cierre de la función
	});


	//Obtener un documento de la colección de recetas
	app.post('/modificarRecetas', function(req, res) {


		//Creamos una variable para obtener el nombre del formulario de la receta a obtener
		var nombre = req.body.nombre;

		//Para borrar una receta mediante el nombre
		Recetas.findOne({nombre: nombre},function (err,receta) {

			//Si no hay error
  			if (!err){

  				//Mostramos un mensaje por consola
  				console.log(nombre + ' va a ser modificado.');

				//Muestra el objeto receta en la página modificarRecetas.ejs
				res.render('modificarRecetas', {
					
					receta: receta
					
				})

  			}
  			else{
		      
		      	//Muestra por consola el error
		    	console.log('ERROR: ' + err);
			}


		//Cierre del findOne	
		});
		
	//Cierre de la función
	});


	//Modificar un documento de la colección de recetas
	app.post('/recetaModificada', function(req, res) {

		//Guardamos los datos obtenidos desde el formulario en las variables a modificar
		var nombre= req.body.nombre;
		var ingredientes= req.body.ingredientes;

		Recetas.update({nombre: nombre}, { nombre: nombre, ingredientes: ingredientes}, null, function (err) {


			//Si hay error
			if (err){
				
		      	//Muestra por consola el error
		    	console.log('ERROR: ' + err);
		    }
		    else{

		    	//Muestra por consola
		    	console.log(nombre+" ha sido modificado.");

			//Cierre del else	
		    }

		//Cierre del método update
		});
		
	//Cierre de la función
	});




	// =====================================
	// ADMIN ===============================
	// =====================================
	app.get('/admin', function(req, res) {
		res.render('admin.ejs');
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